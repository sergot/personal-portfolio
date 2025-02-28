'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, categories } from '@/data/skills';
import Section from './shared/Section';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiGo,
  SiGooglecloud,
  SiVuedotjs,
  SiRedis,
  SiElasticsearch,
  SiApachekafka,
  SiJirasoftware,
  SiTestinglibrary,
  SiDiagramsdotnet,
  SiGithubactions,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { GiCamel } from "react-icons/gi";
import { HiChevronDown } from 'react-icons/hi';

const iconComponents = {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiGo,
  GiCamel,
  SiGooglecloud,
  SiVuedotjs,
  VscAzure,
  SiRedis,
  SiElasticsearch,
  SiApachekafka,
  SiJirasoftware,
  SiTestinglibrary,
  SiDiagramsdotnet,
  SiGithubactions,
};

export default function Skills() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  const handleSkillClick = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const isExpandable = (skill: (typeof skills)[0]) => {
    return skill.frameworks && skill.frameworks.length > 0;
  };

  const renderFrameworks = (skill: (typeof skills)[0], skillId: string) => {
    if (expandedSkill !== skillId) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mt-6 hidden sm:block"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-blue-600 dark:text-blue-400">
              {getIcon(skill.icon)}
            </div>
            <h4 className="text-xl font-semibold">{skill.name}</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skill.frameworks.map((framework, idx) => (
              <motion.div
                key={framework}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
              >
                {framework}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSkillCard = (skill: (typeof skills)[0], categoryIndex: number, skillIndex: number) => {
    const canExpand = isExpandable(skill);
    const skillId = `${categoryIndex}-${skillIndex}-${skill.name}`;
    const isExpanded = expandedSkill === skillId;
    
    return (
      <div className="flex flex-col">
        <motion.div
          layout
          key={skillId}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={`
            bg-white dark:bg-gray-800 
            rounded-lg shadow-lg p-6
            ${canExpand ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}
            ${isExpanded ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
          `}
          onClick={canExpand ? () => handleSkillClick(skillId) : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-blue-600 dark:text-blue-400">
                {getIcon(skill.icon)}
              </div>
              <h4 className="text-lg font-semibold">
                {skill.name}
              </h4>
            </div>
            {canExpand && skill.frameworks.length > 0 && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <HiChevronDown className="w-6 h-6 text-gray-500" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && skill.frameworks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden sm:hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-2">
                <div className="grid grid-cols-1 gap-2">
                  {skill.frameworks.map((framework, idx) => (
                    <motion.div
                      key={framework}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
                    >
                      {framework}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <Section id="skills" title="Skills & Technologies" subtitle="Technologies I work with on a daily basis">
      <div className="space-y-12">
        {categories.map((category, categoryIndex) => {
          const categorySkills = skills.filter((skill) => skill.category === category);
          const rows = chunkArray(categorySkills, 3);

          return (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-6">{category}</h3>
              <div className="space-y-6">
                {rows.map((row, rowIndex) => {
                  const rowKey = `${category}-row-${rowIndex}`;
                  return (
                    <div key={rowKey} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {row.map((skill, skillIndex) => {
                          const skillKey = `${category}-${rowIndex}-${skillIndex}-${skill.name}`;
                          return (
                            <React.Fragment key={skillKey}>
                              {renderSkillCard(skill, categoryIndex, rowIndex * 3 + skillIndex)}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div>
                        {row.map((skill, skillIndex) => {
                          if (!isExpandable(skill)) return null;
                          const skillId = `${categoryIndex}-${rowIndex * 3 + skillIndex}-${skill.name}`;
                          const frameworkKey = `framework-${category}-${rowIndex}-${skillIndex}-${skill.name}`;
                          return (
                            <React.Fragment key={frameworkKey}>
                              {renderFrameworks(skill, skillId)}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
} 