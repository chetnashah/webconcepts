
## pyproject.toml is kind of like package.json/requirements.txt in Python

Use via
```bash
pip install -e . # . contains pyproject.toml
```

```toml
# This is a pyproject.toml file for a Python project.
# It defines the project metadata and dependencies.
[project]
name = "app"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "anthropic>=0.51.0",
    "mcp[cli]>=1.8.0",
    "prompt-toolkit>=3.0.51",
    "python-dotenv>=1.1.0",
]
```