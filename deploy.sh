#!/bin/bash  
cd /home/finance/frontend || exit  
git pull
npm install  
npm run build  
pm2 restart 0