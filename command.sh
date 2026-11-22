npx create-react-app my-app
cd my-app

git checkout -B master
git add .
git commit -m "Initial commit"
gh auth login
gh repo create my-app --public --source=. --remote=origin --push

git checkout -b update_logo

curl -o src/logo.svg "https://cdn-ikponof.nitrocdn.com/vGqfYAGlOLDkYkJqZhYIYKEsibdbZnkc/assets/images/optimized/rev-f684a87/www.propelleraero.com/wp-content/uploads/2023/05/footer-logo.svg"
sed -i 's|https://reactjs.org|https://www.propelleraero.com/dirtmate/|g' src/App.js

git add .
git commit -m "Update logo and link"
git push -u origin update_logo

gh pr create --base master --head update_logo --title "Update logo and link" --body "Replaced React logo with Propeller Aero logo and updated link to DirtMate."
gh pr merge --merge --delete-branch
