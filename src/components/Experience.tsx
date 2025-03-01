'use client';

import { useState } from 'react';
import Section from './shared/Section';
import MotionCard from './shared/MotionCard';
import MotionText from './shared/MotionText';
import { jobs } from '@/data/jobs';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

export default function Experience() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [expandedMobileJob, setExpandedMobileJob] = useState<string | null>(null);

  const handleMobileClick = (jobId: string) => {
    setExpandedMobileJob(expandedMobileJob === jobId ? null : jobId);
  };

  const renderMobileJob = (job: typeof jobs[0]) => {
    const isExpanded = expandedMobileJob === job.id;

    return (
      <motion.div
        layout
        key={job.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <div
          className={`
            bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer
            ${isExpanded ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
          `}
          onClick={() => handleMobileClick(job.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              <p className="text-sm text-gray-500">{job.startDate} - {job.endDate}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <HiChevronDown className="w-6 h-6 text-gray-500" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {job.description.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <Section id="experience" title="Experience" subtitle="My professional journey">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <MotionCard
              key={job.id}
              index={index}
              onClick={() => setSelectedJob(job)}
              className={`transition-colors ${selectedJob.id === job.id ? 'border-2 border-blue-600' : ''}`}
            >
              <MotionText as="h3" className="text-xl font-bold">{job.title}</MotionText>
              <MotionText as="p" className="text-gray-600 dark:text-gray-400">{job.company}</MotionText>
              <MotionText as="p" className="text-sm text-gray-500">{job.location} • {job.type}</MotionText>
              <MotionText as="p" className="text-sm text-gray-500">{job.startDate} - {job.endDate}</MotionText>
            </MotionCard>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-[600px] overflow-y-auto">
          <MotionText as="h3" className="text-2xl font-bold mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2">
            {selectedJob.title}
          </MotionText>
          <MotionText as="p" className="text-xl text-gray-600 dark:text-gray-400 mb-2 sticky top-12 bg-white dark:bg-gray-800 py-2">
            {selectedJob.company}
          </MotionText>
          <div className="space-y-4">
            <div>
              <MotionText as="h4" className="text-lg font-semibold mb-2 sticky top-24 bg-white dark:bg-gray-800 py-2">
                Responsibilities
              </MotionText>
              <ul className="list-disc list-inside space-y-2">
                {selectedJob.description.map((item, index) => (
                  <MotionText as="li" key={index} delay={index * 0.1} className="text-gray-600 dark:text-gray-400">
                    {item}
                  </MotionText>
                ))}
              </ul>
            </div>
            <div>
              <MotionText as="h4" className="text-lg font-semibold mb-2 sticky top-36 bg-white dark:bg-gray-800 py-2">
                Technologies
              </MotionText>
              <div className="flex flex-wrap gap-2">
                {selectedJob.technologies.map((tech, index) => (
                  <MotionText
                    key={tech}
                    delay={index * 0.1}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </MotionText>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {jobs.map((job) => renderMobileJob(job))}
      </div>
    </Section>
  );
} 