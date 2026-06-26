from __future__ import annotations

import json
import time
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


ESPN_STANDINGS_URL = "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings"
CACHE_TTL_SECONDS = 300

TEAM_IDS = {
    "mex", "rsa", "kor", "cze",
    "can", "bih", "qat", "sui",
    "bra", "mar", "sco", "hai",
    "usa", "par", "aus", "tur",
    "ger", "cur", "civ", "ecu",
    "ned", "jpn", "swe", "tun",
    "bel", "egy", "irn", "nzl",
    "esp", "cpv", "ksa", "uru",
    "fra", "sen", "irq", "nor",
    "arg", "alg", "aut", "jor",
    "por", "cod", "uzb", "col",
    "eng", "cro", "gha", "pan",
}

ESPN_TEAM_ALIASES = {
    # ESPN uses CUW for Curacao; the frontend already uses cur.
    "CUW": "cur",
}


class ProviderError(RuntimeError):
    """Raised when upstream data cannot be converted into GoalMap's schema."""


@dataclass
class CacheEntry:
    expires_at: float
    data: dict[str, Any]


_cache: CacheEntry | None = None


def fetch_goalmap_data(force_refresh: bool = False) -> dict[str, Any]:
    """Fetch and normalize World Cup standings into the frontend data shape."""
    global _cache
    now = time.time()
    if not force_refresh and _cache and _cache.expires_at > now:
        return _cache.data

    payload = _fetch_json(ESPN_STANDINGS_URL)
    data = normalize_espn_standings(payload)
    _cache = CacheEntry(expires_at=now + CACHE_TTL_SECONDS, data=data)
    return data


def normalize_espn_standings(payload: dict[str, Any]) -> dict[str, Any]:
    groups: dict[str, list[str]] = {}
    stats: dict[str, list[int]] = {}

    for child in payload.get("children", []):
        group_id = _group_id(child)
        entries = child.get("standings", {}).get("entries", [])
        if not group_id or not entries:
            continue

        ordered_entries = sorted(entries, key=lambda entry: _stat_value(entry, "rank", default=999))
        team_ids: list[str] = []

        for entry in ordered_entries:
            team_id = _team_id(entry)
            team_ids.append(team_id)
            stats[team_id] = [
                _stat_value(entry, "gamesplayed"),
                _stat_value(entry, "wins"),
                _stat_value(entry, "ties"),
                _stat_value(entry, "losses"),
                _stat_value(entry, "pointsfor"),
                _stat_value(entry, "pointsagainst"),
                _stat_value(entry, "pointdifferential"),
                _stat_value(entry, "points"),
                _stat_value(entry, "advanced"),
            ]

        groups[group_id] = team_ids

    expected_groups = [chr(code) for code in range(ord("A"), ord("L") + 1)]
    missing = [group_id for group_id in expected_groups if group_id not in groups]
    if missing:
        raise ProviderError(f"Missing groups from ESPN standings: {', '.join(missing)}")

    third_order = sorted(
        expected_groups,
        key=lambda group_id: _third_sort_key(group_id, groups, stats),
    )

    return {
        "updatedAt": _utc_now_iso(),
        "source": ESPN_STANDINGS_URL,
        "mode": "live",
        "provider": "espn",
        "groups": {group_id: groups[group_id] for group_id in expected_groups},
        "thirdOrder": third_order,
        "stats": stats,
    }


def to_window_script(data: dict[str, Any]) -> str:
    return "window.GOALMAP_REAL_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"


def _fetch_json(url: str) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "GoalMap/1.0 (+https://github.com/)",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=12) as response:
            return json.loads(response.read().decode("utf-8"))
    except OSError as exc:
        raise ProviderError(f"Failed to fetch ESPN standings: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise ProviderError("ESPN standings response was not valid JSON") from exc


def _group_id(child: dict[str, Any]) -> str | None:
    name = str(child.get("name", ""))
    candidate = name.rsplit(" ", 1)[-1].strip().upper()
    return candidate if len(candidate) == 1 and "A" <= candidate <= "L" else None


def _team_id(entry: dict[str, Any]) -> str:
    abbreviation = str(entry.get("team", {}).get("abbreviation", "")).upper()
    team_id = ESPN_TEAM_ALIASES.get(abbreviation, abbreviation.lower())
    if team_id not in TEAM_IDS:
        raise ProviderError(f"Unknown ESPN team abbreviation: {abbreviation}")
    return team_id


def _stat_value(entry: dict[str, Any], key: str, default: int = 0) -> int:
    key = key.lower()
    for stat in entry.get("stats", []):
        names = {
            str(stat.get("type", "")).lower(),
            str(stat.get("name", "")).lower(),
            str(stat.get("abbreviation", "")).lower(),
        }
        if key in names:
            return int(float(stat.get("value", default) or default))
    return default


def _third_sort_key(
    group_id: str,
    groups: dict[str, list[str]],
    stats: dict[str, list[int]],
) -> tuple[int, int, int, str]:
    team_id = groups[group_id][2]
    gp, wins, draws, losses, gf, ga, gd, points, advanced = stats[team_id]
    return (-points, -gd, -gf, group_id)


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
