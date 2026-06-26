from __future__ import annotations

import argparse
import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

try:
    from .worldcup_provider import ProviderError, fetch_goalmap_data, to_window_script
except ImportError:  # Allows running as: python backend/server.py
    from worldcup_provider import ProviderError, fetch_goalmap_data, to_window_script


PROJECT_ROOT = Path(__file__).resolve().parents[1]
STATIC_REAL_DATA = PROJECT_ROOT / "real-data.js"


class GoalMapRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_GET(self) -> None:
        path = urlparse(self.path).path

        if path == "/api/health":
            self._send_json({"ok": True, "provider": "espn"})
            return

        if path == "/api/world-cup/standings":
            self._send_live_json()
            return

        if path == "/real-data.js":
            self._send_live_script()
            return

        super().do_GET()

    def _send_live_json(self) -> None:
        try:
            self._send_json(fetch_goalmap_data())
        except ProviderError as exc:
            self._send_json({"error": str(exc)}, status=HTTPStatus.BAD_GATEWAY)

    def _send_live_script(self) -> None:
        try:
            body = to_window_script(fetch_goalmap_data()).encode("utf-8")
            self._send_bytes(body, "application/javascript; charset=utf-8")
        except ProviderError:
            body = STATIC_REAL_DATA.read_bytes()
            self._send_bytes(
                body,
                "application/javascript; charset=utf-8",
                extra_headers={"X-GoalMap-Data-Fallback": "static"},
            )

    def _send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self._send_bytes(body, "application/json; charset=utf-8", status=status)

    def _send_bytes(
        self,
        body: bytes,
        content_type: str,
        status: HTTPStatus = HTTPStatus.OK,
        extra_headers: dict[str, str] | None = None,
    ) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        for name, value in (extra_headers or {}).items():
            self.send_header(name, value)
        self.end_headers()
        self.wfile.write(body)


def run(host: str, port: int) -> None:
    server = ThreadingHTTPServer((host, port), GoalMapRequestHandler)
    print(f"GoalMap backend running at http://{host}:{port}")
    print("Live data endpoint: /api/world-cup/standings")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the GoalMap Python backend.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    run(args.host, args.port)


if __name__ == "__main__":
    main()
