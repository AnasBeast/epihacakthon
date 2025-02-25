import React from "react"

const Profile = () => {
  // In a real application, this data would come from a backend API
  const userProgress = {
    name: "Alex",
    age: 8,
    totalLessons: 15,
    quizzesTaken: 5,
    averageScore: 80,
    subjects: [
      { name: "Math", progress: 75 },
      { name: "Science", progress: 60 },
      { name: "Language", progress: 90 },
    ],
    achievements: ["Quick Learner", "Quiz Master", "Science Explorer"],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">My Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xl">
            <strong>Name:</strong> {userProgress.name}
          </p>
          <p className="text-xl">
            <strong>Age:</strong> {userProgress.age}
          </p>
          <p className="text-xl">
            <strong>Total Lessons Completed:</strong> {userProgress.totalLessons}
          </p>
          <p className="text-xl">
            <strong>Quizzes Taken:</strong> {userProgress.quizzesTaken}
          </p>
          <p className="text-xl">
            <strong>Average Quiz Score:</strong> {userProgress.averageScore}%
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Subject Progress</h3>
          {userProgress.subjects.map((subject) => (
            <div key={subject.name} className="mb-2">
              <p className="text-lg">{subject.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${subject.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {userProgress.achievements.map((achievement) => (
            <span
              key={achievement}
              className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {achievement}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile

