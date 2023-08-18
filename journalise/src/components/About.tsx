/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const About = () => {
    return (
        <div className=" text-white font-sans leading-normal tracking-normal">

            {/* Header Section */}
            <header className="text-center py-16 hover:drop-shadow-[0_0_0.3rem_#ffffff70] text-white">
                <h1 className="text-4xl font-bold">Introducing <span className="text-yellow-300">Journalise</span></h1>
                <p className="mt-2">Unveil Your Weekly Progress Through AI-Powered Journal Analysis</p>
            </header>

            {/* Main Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-gray-900 shadow-md rounded-lg p-8">

                    {/* Project Overview */}
                    <h2 className="text-2xl font-bold mb-4">Project Overview:</h2>
                    <p>"Journalise" is an AI-driven platform that allows users to record their daily thoughts, experiences,
                        and reflections in a journal format. Our cutting-edge AI model then deciphers your entries, extracting
                        meaningful information about your emotional journey, professional accomplishments, and personal development
                        over the week.</p>

                    {/* How It Works */}
                    <h2 className="text-2xl font-bold mt-6 mb-4">How It Works:</h2>
                    <ol className="list-decimal list-inside">
                        <li><strong>User-Friendly Journaling:</strong> Start your week by capturing your daily experiences,
                            thoughts, and emotions in our easy-to-use journal interface.</li>
                        <li><strong>AI Analysis:</strong> Our advanced AI model processes your journal entries, understanding your
                            emotional state, the skills you're developing, and the progress you're making.</li>
                        <li><strong>Insightful Reports:</strong> At the end of the week, "Journalise" compiles an insightful
                            report that showcases your emotional trends, newly acquired skills, and overall progress.</li>
                    </ol>

                    {/* Features */}
                    <h2 className="text-2xl font-bold mt-6 mb-4">Features:</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Emotional Insights:</strong> Discover how your emotions fluctuate throughout the week, from
                            excitement and curiosity to determination and accomplishment.</li>
                        <li><strong>Skillset Enhancement:</strong> Uncover the skills you're actively cultivating, whether it's in
                            public speaking, creative writing, problem-solving, or more.</li>
                        <li><strong>Progress Trends:</strong> Track your journey by observing the progress you've made across various
                            aspects of your life.</li>
                    </ul>

                    {/* Target Audience */}
                    <h2 className="text-2xl font-bold mt-6 mb-4">Who Can Benefit:</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Professionals:</strong> Navigate your workweek with a better understanding of your emotions and
                            personal growth, enhancing your productivity and satisfaction.</li>
                        <li><strong>Students:</strong> Witness your academic and personal development as you refine skills and
                            overcome challenges in your journey of learning.</li>
                        <li><strong>Enthusiasts:</strong> Whether you're an artist, athlete, or hobbyist, "Journalise" helps you
                            observe how your passion evolves over time.</li>
                    </ul>

                    {/* Why Choose Journalise */}
                    <h2 className="text-2xl font-bold mt-6 mb-4">Why Choose "Journalise":</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>AI-Powered Analysis:</strong> Benefit from advanced AI capabilities that extract valuable insights
                            from your journal entries, offering a deeper understanding of your week's progress.</li>
                        <li><strong>Personalized Growth:</strong> Tailor your journey by recognizing emotional patterns, skill
                            development, and trends unique to you.</li>
                        <li><strong>User-Focused Interface:</strong> Enjoy an intuitive platform that makes journaling and progress
                            tracking seamless and enjoyable.</li>
                        <li><strong>Comprehensive Reports:</strong> Receive detailed reports at the end of each week that provide a
                            holistic view of your journey.</li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default About;
