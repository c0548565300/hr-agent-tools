# --- שלב 1: שלב הבנייה (Builder) ---
FROM node:18 AS builder

# הגדרת תיקיית עבודה
WORKDIR /app

# העתקת קבצי ניהול החבילות
COPY package*.json ./

# התקנת כל התלויות (כולל TypeScript וכלי פיתוח)
RUN npm install

# העתקת קוד המקור והגדרות ה-TypeScript
COPY . .

# הרצת ה-Build: הפיכת TS ל-JS (יוצר את תיקיית dist)
RUN npm run build

# --- שלב 2: שלב ההרצה (Runner) ---
FROM node:18-slim

WORKDIR /app

# העתקת קבצי ניהול החבילות בלבד לשלב הסופי
COPY package*.json ./

# התקנת תלויות ייצור בלבד (חוסך מקום ומשפר אבטחה)
RUN npm install --omit=dev

# העתקת הקוד המקומפל בלבד משלב ה-Builder
COPY --from=builder /app/dist ./dist

# חשיפת הפורט שגוגל קלאוד מצפה לו (לרוב 8080)
EXPOSE 8080

# הרצת השרת באמצעות Node.js נקי (הכי יציב בייצור)
CMD ["node", "dist/server.js"]