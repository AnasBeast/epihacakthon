import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/header';
import Footer from '../components/footer';
const cards = [
  { id: 1, title: 'Quiz Game', description: 'Test your knowledge!', link: '/quizz', color: 'bg-purple-500' },
  { id: 2, title: 'Fill in the Gaps', description: 'Complete the sentences', link: '/words', color: 'bg-blue-500' },
  { id: 3, title: 'Repeat this', description: '.', link: '/qna', color: 'bg-green-500' },
];

const Challenges= () => {
  return (
    <div className='min-h-screen'>
        <Header />
        <div>
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold  mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Game
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`${card.color} w-64 h-80 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={card.link}>
              <div className="h-full flex flex-col justify-between p-6">
                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {card.title}
                </motion.h2>
                <motion.p
                  className="text-white text-opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {card.description}
                </motion.p>
                <motion.div
                  className="mt-4 bg-white bg-opacity-20 text-white py-2 px-4 rounded-full text-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Play Now
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
        </div>
        <Footer />
    </div>
  );
};

export default Challenges