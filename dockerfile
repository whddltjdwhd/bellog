# 1) 빌드 스테이지
FROM node:18 AS builder
WORKDIR /app

# package.json, pnpm-lock.yaml만 먼저 복사 → 의존성 설치 캐싱
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# 나머지 소스 복사 (public 포함)
COPY . .

# Next.js 빌드
RUN pnpm build

# 2) 프로덕션 스테이지 (alpine 등 경량 베이스)
FROM node:18-alpine
WORKDIR /app

# 빌드 산출물, public 폴더, package.json, lock 파일 복사
COPY --from=builder /app/.next ./.next
# public 폴더를 프로덕션 스테이지에 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod --ignore-scripts

EXPOSE 3000

CMD ["pnpm", "start"]