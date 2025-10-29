import React from 'react';

const Dashboard = ({ feedbacks }) => {
  const totalFeedbacks = feedbacks.length;
  
  const averageRating = totalFeedbacks > 0 
    ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / totalFeedbacks).toFixed(1)
    : 0;

  const ratingDistribution = {
    1: feedbacks.filter(fb => fb.rating === 1).length,
    2: feedbacks.filter(fb => fb.rating === 2).length,
    3: feedbacks.filter(fb => fb.rating === 3).length,
    4: feedbacks.filter(fb => fb.rating === 4).length,
    5: feedbacks.filter(fb => fb.rating === 5).length
  };

  const courseCounts = feedbacks.reduce((acc, fb) => {
    acc[fb.courseCode] = (acc[fb.courseCode] || 0) + 1;
    return acc;
  }, {});

  const popularCourses = Object.entries(courseCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <h2>Feedback Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p className="stat-number">{totalFeedbacks}</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-number">{averageRating}/5</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Rating Distribution</h3>
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} ★</span>
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{
                    width: `${totalFeedbacks > 0 ? (ratingDistribution[rating] / totalFeedbacks) * 100 : 0}%`
                  }}
                ></div>
              </div>
              <span className="rating-count">({ratingDistribution[rating]})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Most Popular Courses</h3>
        {popularCourses.length > 0 ? (
          <div className="course-list">
            {popularCourses.map(([course, count]) => (
              <div key={course} className="course-item">
                <span className="course-code">{course}</span>
                <span className="course-count">{count} feedbacks</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback data available.</p>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Recent Feedback</h3>
        {feedbacks.length > 0 ? (
          <div className="recent-feedback">
            {feedbacks.slice(0, 3).map(feedback => (
              <div key={feedback.id} className="recent-item">
                <strong>{feedback.courseCode}</strong> - {feedback.rating}★
                <p className="recent-comment">{feedback.comments.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent feedback.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;