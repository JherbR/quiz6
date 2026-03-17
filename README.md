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



