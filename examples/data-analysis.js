// Advanced data analysis example for WHOOP MCP Server
// This example shows how to analyze fitness and health data

// Example of analyzing WHOOP data for insights:

// 1. Get the last 30 days of data
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const startDate = thirtyDaysAgo.toISOString();

// 2. Fetch comprehensive data for analysis
const cycles = await callTool('whoop-get-cycle-collection', {
  limit: 30,
  start: startDate
});

const sleepData = await callTool('whoop-get-sleep-collection', {
  limit: 30,
  start: startDate
});

const workouts = await callTool('whoop-get-workout-collection', {
  limit: 30,
  start: startDate
});

const recoveryData = await callTool('whoop-get-recovery-collection', {
  limit: 30,
  start: startDate
});

// 3. Analyze sleep patterns
function analyzeSleep(sleepRecords) {
  const totalSleep = sleepRecords.reduce((sum, record) => {
    if (record.score?.stage_summary) {
      return sum + record.score.stage_summary.total_in_bed_time_milli / (1000 * 60 * 60); // Convert to hours
    }
    return sum;
  }, 0);
  
  const avgSleepHours = totalSleep / sleepRecords.length;
  const sleepEfficiency = sleepRecords.reduce((sum, record) => {
    return sum + (record.score?.sleep_efficiency_percentage || 0);
  }, 0) / sleepRecords.length;
  
  return {
    averageSleepHours: avgSleepHours.toFixed(2),
    averageSleepEfficiency: sleepEfficiency.toFixed(1) + '%',
    totalSleepRecords: sleepRecords.length
  };
}

// 4. Analyze workout patterns
function analyzeWorkouts(workoutRecords) {
  const totalStrain = workoutRecords.reduce((sum, record) => {
    return sum + (record.score?.strain || 0);
  }, 0);
  
  const avgStrain = totalStrain / workoutRecords.length;
  const totalCalories = workoutRecords.reduce((sum, record) => {
    return sum + (record.score?.kilojoule || 0) / 4.184; // Convert kJ to kcal
  }, 0);
  
  const sportBreakdown = workoutRecords.reduce((acc, record) => {
    const sport = record.sport_name;
    acc[sport] = (acc[sport] || 0) + 1;
    return acc;
  }, {});
  
  return {
    averageStrain: avgStrain.toFixed(2),
    totalCalories: Math.round(totalCalories),
    totalWorkouts: workoutRecords.length,
    sportBreakdown
  };
}

// 5. Analyze recovery patterns
function analyzeRecovery(recoveryRecords) {
  const avgRecoveryScore = recoveryRecords.reduce((sum, record) => {
    return sum + (record.score?.recovery_score || 0);
  }, 0) / recoveryRecords.length;
  
  const avgHRV = recoveryRecords.reduce((sum, record) => {
    return sum + (record.score?.hrv_rmssd_milli || 0);
  }, 0) / recoveryRecords.length;
  
  const avgRestingHR = recoveryRecords.reduce((sum, record) => {
    return sum + (record.score?.resting_heart_rate || 0);
  }, 0) / recoveryRecords.length;
  
  return {
    averageRecoveryScore: avgRecoveryScore.toFixed(1) + '%',
    averageHRV: Math.round(avgHRV) + 'ms',
    averageRestingHR: Math.round(avgRestingHR) + ' bpm',
    totalRecoveryRecords: recoveryRecords.length
  };
}

// 6. Generate insights
const sleepInsights = analyzeSleep(sleepData.records);
const workoutInsights = analyzeWorkouts(workouts.records);
const recoveryInsights = analyzeRecovery(recoveryData.records);

console.log('=== WHOOP Data Analysis (Last 30 Days) ===');
console.log('\nSleep Analysis:');
console.log(`- Average Sleep: ${sleepInsights.averageSleepHours} hours`);
console.log(`- Sleep Efficiency: ${sleepInsights.averageSleepEfficiency}`);
console.log(`- Sleep Records: ${sleepInsights.totalSleepRecords}`);

console.log('\nWorkout Analysis:');
console.log(`- Average Strain: ${workoutInsights.averageStrain}`);
console.log(`- Total Calories Burned: ${workoutInsights.totalCalories} kcal`);
console.log(`- Total Workouts: ${workoutInsights.totalWorkouts}`);
console.log('- Sport Breakdown:', workoutInsights.sportBreakdown);

console.log('\nRecovery Analysis:');
console.log(`- Average Recovery Score: ${recoveryInsights.averageRecoveryScore}`);
console.log(`- Average HRV: ${recoveryInsights.averageHRV}`);
console.log(`- Average Resting HR: ${recoveryInsights.averageRestingHR}`);
console.log(`- Recovery Records: ${recoveryInsights.totalRecoveryRecords}`);

// 7. Generate recommendations
function generateRecommendations(sleep, workouts, recovery) {
  const recommendations = [];
  
  if (parseFloat(sleep.averageSleepHours) < 7) {
    recommendations.push('Consider increasing sleep duration to 7-9 hours for better recovery');
  }
  
  if (parseFloat(sleep.averageSleepEfficiency) < 85) {
    recommendations.push('Focus on improving sleep efficiency through better sleep hygiene');
  }
  
  if (parseFloat(recovery.averageRecoveryScore) < 70) {
    recommendations.push('Consider reducing training intensity or increasing recovery time');
  }
  
  if (parseFloat(workouts.averageStrain) > 15) {
    recommendations.push('High average strain detected - ensure adequate recovery between sessions');
  }
  
  return recommendations;
}

const recommendations = generateRecommendations(sleepInsights, workoutInsights, recoveryInsights);
console.log('\nRecommendations:');
recommendations.forEach((rec, index) => {
  console.log(`${index + 1}. ${rec}`);
});
