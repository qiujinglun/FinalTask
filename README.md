# 健身訓練紀錄管理系統 (Fitness Training Record System)

## 專案簡介

使用 React、Express 與 MongoDB 開發的健身訓練紀錄管理系統。

使用者可以透過網頁記錄每日訓練內容，包括訓練部位、訓練重量、組數、次數等資訊，並可查看、搜尋、編輯及刪除訓練紀錄，協助使用者追蹤個人健身進度與訓練成果。

本系統完整實作：

React → Express API → MongoDB → React 更新畫面

符合課程要求之資料流(Data Flow)架構。


# 使用技術

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js
* Mongoose
* CORS
* dotenv

## Database

* MongoDB Community Server
* MongoDB Compass


# 系統功能

## 基本功能

### 1. 訓練紀錄列表

顯示所有訓練資料。

### 2. 新增訓練紀錄

使用表單新增訓練內容。

### 3. 刪除訓練紀錄

可移除不需要的紀錄。

### 4. 編輯訓練紀錄

修改既有訓練資料。

### 5. 表單驗證

必填欄位不得為空白。

### 6. Loading 狀態

資料載入時顯示提示訊息。

### 7. Error 錯誤處理

API 發生錯誤時顯示錯誤訊息。

### 8. Empty State

當資料庫沒有資料時顯示提示訊息。

---

# 特色功能

## 1. 訓練紀錄搜尋

可依照關鍵字搜尋訓練紀錄。

## 2. 訓練排行榜

依據訓練數據進行排序與排名。

## 3. 訓練統計分析

統計目前系統中的訓練紀錄數量。

## 4. 完成狀態管理

可記錄訓練是否完成。

---

# MongoDB Schema

Collection：events

| 欄位名稱         | 型態      | 說明     |
| ------------ | ------- | ------ |
| userName     | String  | 使用者姓名  |
| userWeight   | Number  | 使用者體重  |
| userHeight   | Number  | 使用者身高  |
| exerciseName | String  | 訓練項目名稱 |
| bodyPart     | String  | 訓練部位   |
| weight       | Number  | 訓練重量   |
| sets         | Number  | 組數     |
| reps         | Number  | 次數     |
| trainingDate | Date    | 訓練日期   |
| isCompleted  | Boolean | 是否完成   |

---

# API 路由表

## 取得所有資料

GET /api/events

功能：

取得所有訓練紀錄。

## 新增資料

POST /api/events

功能：

新增訓練紀錄。

## 刪除資料

DELETE /api/events/:id

功能：

刪除指定訓練紀錄。

## 更新資料

PUT /api/events/:id

功能：

修改指定訓練紀錄。

# 專案結構

FinalTask
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── screenshots
│
└── README.md

# 環境變數設定

backend/.env

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/web_management_campus_events

# 安裝與執行方式

## 1. 啟動 MongoDB

請先安裝 MongoDB Community Server。

確認 MongoDB 已啟動：

mongodb://127.0.0.1:27017

## 2. 啟動後端

```bash
cd event_api_solution\backend\

npm install

npm run dev
```

後端預設執行：

http://localhost:3000

## 3. 啟動前端

```bash
cd starter\frontend\

npm install

npm run dev
```

前端預設執行：

http://localhost:5173

# 學習心得

本專案為網站管理課程期末專題，主題為「健身訓練紀錄管理系統」。隨著現代人越來越重視健康與運動，許多人會透過重量訓練、肌力訓練等方式維持身體狀態，因此我設計了一套能夠記錄與管理健身訓練資料的系統，讓使用者能夠更方便地追蹤自己的訓練成果與進度。

本系統採用 React、Express 以及 MongoDB 作為主要開發技術，並使用前後端分離架構進行開發。前端透過 React 建立互動式使用者介面，讓使用者可以輕鬆輸入與查看訓練紀錄；後端則使用 Express 建立 RESTful API，負責接收前端請求並與 MongoDB 資料庫進行資料交換。系統完整實作新增、新增、查詢、編輯及刪除等 CRUD 功能，並透過 API 串接完成資料流動。

在功能方面，使用者可以記錄姓名、身高、體重、訓練項目、訓練部位、訓練重量、組數、次數以及訓練日期等資訊，同時也能標記訓練是否完成。此外，系統還提供搜尋功能、排行榜功能以及訓練統計功能，讓使用者能更快速地查找資料，並了解自己的訓練狀況。為了提升使用體驗，系統也實作了 Loading、Error Handling 與 Empty State 等功能，使畫面在資料載入、錯誤發生或無資料時都能提供適當的提示訊息。

透過本次專題，我學習到 React 前端開發、Express API 設計、MongoDB 資料庫操作以及前後端資料串接的完整流程，也更加理解網站系統開發的實際運作方式。



---

# 開發工具

* Visual Studio Code
* Node.js
* MongoDB Community Server
* MongoDB Compass

---

