import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Dashboard from './components/Dashboard';
import './styles/App.css';

// Add this line at the top - Dynamic API URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-app.railway.app' // You'll replace this after backend deployment
  : 'http://localhost:5000';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('form');

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`);
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        fetchFeedbacks();
        setActiveTab('list');
        alert('Feedback submitted successfully!');
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchFeedbacks();
          alert('Feedback deleted successfully!');
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Failed to delete feedback');
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Feedback System</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'form' ? 'active' : ''} 
            onClick={() => setActiveTab('form')}
          >
            Submit Feedback
          </button>
          <button 
            className={activeTab === 'list' ? 'active' : ''} 
            onClick={() => setActiveTab('list')}
          >
            View Feedback
          </button>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'form' && (
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        )}
        {activeTab === 'list' && (
          <FeedbackList 
            feedbacks={feedbacks} 
            onDelete={handleDeleteFeedback}
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard feedbacks={feedbacks} />
        )}
      </main>
    </div>
  );
}

export default App;