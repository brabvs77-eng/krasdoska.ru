"""Load .env from project root into os.environ (setdefault only)."""

from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_env() -> Path:
    env_path = ROOT / ".env"
    if env_path.is_file():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(
                    key.strip(),
                    value.strip().strip('"').strip("'"),
                )
    return ROOT
