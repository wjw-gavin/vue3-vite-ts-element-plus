#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init 

# 如果提交失败，可能因为 git init 默认分支是 master，而远程默认是 main，所以提交会报错。可以打开一下两行命令再次尝试
# git branch -m master main
# git symbolic-ref HEAD refs/heads/main

git add -A
git commit -m 'docs: update docs'


# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:wjw-gavin/vue3-vite-ts-element-plus.git main:gh-pages

cd -