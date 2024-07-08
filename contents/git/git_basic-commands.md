# Git Basic Commands

### Set User Configuration

```bash
git config --global user.name "username"
git config --global user.email "email@email.com"
```

### Default Code Editor

```bash
git config --global core.editor "code --wait"
```

### Show All Configuration

```bash
git config --list --show-origin
```

### Create Git Repository

```bash
git init
```

### Show Git Status

```bash
git status
```

### Add File(s) to Staging

```bash
git add filename.extension
```

### Commit

```bash
git commit -m "commit message"
```

### Show File Diff (Changes)

```bash
git diff filename.extension
```

### Restore File Changes

```bash
git restore filename.extension
```

### Restore Staged File to Working Directory State

```bash
git restrore --staged filename.extension
```

### Show Full Log

```bash
git log
```

### Show Log One line

```bash
git log --oneline
```

### Show Log Graph

```bash
git log --oneline --graph
```

### Show Commit Changes

```bash
git show hash
```

### Show Diff between 2 commits

```bash
git diff hash1 hash2
```

### Reset Commit

```bash
git reset <mode> hash
```

#### Reset Mode

- `--soft`, memindahkan HEAD pointer, namun tidak melakukan perubahan apapun di Staging Index dan Working Directory
- `--mixed (default)`, memindahkan HEAD pointer, mengubah Staging Index menjadi sama seperti dengan Repository, namun
  tidak mengubah apapun di Working Directory
- `--hard`, memindahkan HEAD pointer, dan mengubah Staging Index dan Working Directory sehingga sama dengan Repository

### Replace Last commit with a new one

```bash
git commit --amend -m "commit message"
```

### Show current branch

```bash
git branch --show-current
```

### Show committed commit file changes

```bash
git checkout hash -- filename.extension
```

### Back to HEAD(Last Commit) after checkout

```bash
git checkout branchname
```

#### Revert to older commit (will add new commit)

```bash
git revert hash
```

### Show who made changes

```bash
git blame filename.extension
```

### Git alias

```bash
git config --global alias.aliasname gitcommand

# example
git config --global alias.c commit
git config --global alias.ll "log --oneline"
```