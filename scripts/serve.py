#!/usr/bin/env python3
"""Serve the static resume site locally."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOST = "127.0.0.1"
PORT = 8000


class ResumeSiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), ResumeSiteHandler)
    print(f"Serving {ROOT} at http://{HOST}:{PORT}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
