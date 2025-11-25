import os
from pathlib import Path
import fnmatch

def load_gitignore(directory):
    """
    Load .gitignore patterns from the directory and return a list of patterns.
    """
    gitignore_path = Path(directory) / ".gitignore"
    patterns = []
    if gitignore_path.is_file():
        with open(gitignore_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):  # Ignore comments and empty lines
                    patterns.append(line)
    return patterns

def is_ignored(file_path, patterns):
    """
    Check if a file matches any .gitignore patterns.
    """
    for pattern in patterns:
        # Match directory patterns (e.g., "dexaggenv/")
        if pattern.endswith("/") and file_path.startswith(pattern[:-1]):
            return True
        # Match file patterns
        if fnmatch.fnmatch(file_path, pattern):
            return True
    return False


def concatenate_files_with_gitignore(directory, output_file):
    """
    Concatenate all files in the directory into a single file, excluding those in .gitignore and .git files.
    """
    patterns = load_gitignore(directory)
    print("Loaded ignore patterns:", patterns)  # Debugging
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(directory):
            # Skip .git directory
            dirs[:] = [d for d in dirs if d != '.git' and not is_ignored(os.path.relpath(os.path.join(root, d), directory), patterns)]
            for file in files:
                file_path = os.path.relpath(os.path.join(root, file), directory)
                # Skip .git files
                if file.startswith('.git') or is_ignored(file_path, patterns):
                    continue
                try:
                    with open(os.path.join(root, file), 'r', encoding='utf-8') as infile:
                        outfile.write(f"\n# File: {file_path}\n")
                        outfile.write(infile.read())
                        outfile.write("\n\n")
                except UnicodeDecodeError:
                    print(f"Skipping non-UTF-8 file: {file_path}")




# Replace 'your_directory' and 'output.txt' with your desired paths
concatenate_files_with_gitignore('.', 'output.txt')
