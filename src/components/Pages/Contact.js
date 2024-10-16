import React from 'react';

export function Contact(props) {
  const { question, options, handleAnswer } = props;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="rounded-full py-3 px-6 border border-gray-400 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={() => handleAnswer(option.isCorrect)}
          >
            {option.answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Contact;
