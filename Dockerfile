FROM registry-gitlab.tdbm.mn/devops/container-images/node:18


WORKDIR /app

COPY .next/standalone/ /app/
COPY .next/static/ /app/.next/static
COPY public /app/public
COPY .env /app/.env

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown nextjs:nodejs /app
EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node server.js

