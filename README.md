### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv ..\myenv
   ..\myenv\Scripts\Activate.ps1
   
   # Mac/Linux
   python3 -m venv ../myenv
   source ../myenv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables (.env):**
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET=your_paypal_secret
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (admin):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server:**
   ```bash
   python manage.py runserver
   ```
   Server runs at: `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (.env):**
   ```env
   REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
   REACT_APP_API_BASE=http://127.0.0.1:8000
   ```

4. **Start development server:**
   ```bash
   npm start
   ```
   App runs at: `http://localhost:3000`

---

## 💳 PayPal Integration

### Sandbox Testing
1. Go to https://developer.paypal.com/dashboard
2. Create Business and Personal test accounts
3. Use Personal account as buyer
4. Found in: Sandbox → Accounts

### Test Cards
- Visa: 4111 1111 1111 1111
- Mastercard: 5555 5555 5555 4444
- Expiry: Any future date
- CVV: Any 3 digits

---

## 📡 API Documentation

### Complete API Reference

#### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/login/` | User login |
| POST | `/api/v1/users/register/` | User registration |
| GET | `/api/v1/users/profile/` | Get current user profile |
| PATCH | `/api/v1/users/profile/` | Update profile |
| GET | `/api/v1/users/admin/users/` | List users (admin) |

#### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/services/list/` | List all services |
| GET | `/api/v1/services/{id}/` | Get service details |
| POST | `/api/v1/services/manage/` | Create service (seller) |
| GET | `/api/v1/services/manage/` | List seller services |
| PATCH | `/api/v1/services/manage/{id}/` | Update service |
| DELETE | `/api/v1/services/manage/{id}/` | Delete service |

#### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/orders/create/` | Create order |
| GET | `/api/v1/orders/history/` | Order history |

#### Seller Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/applications/apply/` | Submit application |
| GET | `/api/v1/applications/list/` | List applications (admin) |
| PATCH | `/api/v1/applications/{id}/approve/` | Approve application |
| PATCH | `/api/v1/applications/{id}/decline/` | Decline application |

#### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/subscriptions/tiers/` | List subscription tiers |
| GET | `/api/v1/subscriptions/admin/list/` | List subscriptions (admin) |

#### Chat (AI)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/chat/ask/` | Ask AI chatbot (requires subscription) |

## 📊 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_api_key
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret


```

### Frontend (.env)
```env
REACT_APP_PAYPAL_CLIENT_ID=your_client_id
REACT_APP_API_BASE=http://127.0.0.1:8000

2 Business Account
sb-ezje650012053@business.example.com
9'L$M,/d
sb-wf4ak49935746@business.example.com
b2-]w6DI

1 Personal Account
