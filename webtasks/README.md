```bash
# you will need to copy then contents of a service account JSON file and paste here
FIREBASE_ADMIN_TOKEN=...

# then you will need to create the webtask with this token as a secret
wt create server.js --secret FIREBASE_ADMIN_TOKEN=$FIREBASE_ADMIN_TOKEN --meta wt-compiler=webtask-tools/express
```
