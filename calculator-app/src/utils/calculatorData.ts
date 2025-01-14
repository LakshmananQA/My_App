export interface WorkoutConcept {
  title: string;
  category: string;
  steps: string[];
  formula?: string;
  example: {
    title: string;
    problem: string;
    solution: string[];
    result: string;
  };
}

export const workoutConcepts: { [key: string]: WorkoutConcept } = {
  // TNPSC Section
  "Percentage Calculator": {
    title: "Percentage Calculator",
    category: "TNPSC",
    steps: [
      "Enter the obtained marks",
      "Enter the total marks",
      "Multiply obtained marks by 100",
      "Divide by total marks"
    ],
    formula: "(Obtained Marks × 100) ÷ Total Marks",
    example: {
      title: "Calculate Percentage in General Studies",
      problem: "A candidate scored 85 marks out of 100 in General Studies",
      solution: [
        "Obtained Marks = 85",
        "Total Marks = 100",
        "Percentage = (85 × 100) ÷ 100",
      ],
      result: "85%"
    }
  },
  "Mark Weightage": {
    title: "Mark Weightage Calculator",
    category: "TNPSC",
    steps: [
      "Enter subject mark",
      "Enter weightage percentage",
      "Multiply mark by weightage",
      "Divide by 100"
    ],
    formula: "(Subject Mark × Weightage) ÷ 100",
    example: {
      title: "Calculate Weighted Score",
      problem: "Calculate weighted score for 80 marks with 30% weightage",
      solution: [
        "Subject Mark = 80",
        "Weightage = 30%",
        "Weighted Score = (80 × 30) ÷ 100",
      ],
      result: "24 weighted marks"
    }
  },
  "Cutoff Calculator": {
    title: "Community Cutoff Calculator",
    category: "TNPSC",
    steps: [
      "Enter your total marks",
      "Select your community",
      "Compare with cutoff marks",
      "Check eligibility"
    ],
    formula: "Total Marks ≥ Community Cutoff",
    example: {
      title: "Check Community Cutoff Eligibility",
      problem: "Check if 320 marks meets BC community cutoff of 300",
      solution: [
        "Your Marks = 320",
        "BC Cutoff = 300",
        "Compare: 320 ≥ 300",
      ],
      result: "Eligible - Above Cutoff"
    }
  },

  // Aptitude Section
  "Time and Work": {
    title: "Time and Work",
    category: "Aptitude",
    steps: [
      "Note individual work rates",
      "Convert to common time unit",
      "Add work rates for combined",
      "Calculate total time"
    ],
    formula: "Combined Time = (A × B) ÷ (A + B)",
    example: {
      title: "Combined Work Calculation",
      problem: "A can do a work in 12 days, B in 15 days. Find time taken together",
      solution: [
        "A's rate = 1/12 per day",
        "B's rate = 1/15 per day",
        "Combined rate = (1/12 + 1/15)",
        "Time = 1 ÷ (1/12 + 1/15)"
      ],
      result: "6.67 days"
    }
  },
  "Speed Distance Time": {
    title: "Speed Distance Time",
    category: "Aptitude",
    steps: [
      "Identify given values",
      "Use relevant formula",
      "Convert units if needed",
      "Calculate result"
    ],
    formula: "Speed = Distance ÷ Time",
    example: {
      title: "Calculate Average Speed",
      problem: "A train covers 300 km in 4 hours. Find average speed",
      solution: [
        "Distance = 300 km",
        "Time = 4 hours",
        "Speed = 300 ÷ 4"
      ],
      result: "75 km/hr"
    }
  },
  "Profit and Loss": {
    title: "Profit and Loss",
    category: "Aptitude",
    steps: [
      "Note Cost Price (CP)",
      "Note Selling Price (SP)",
      "Calculate difference",
      "Find percentage"
    ],
    formula: "Profit% = ((SP - CP) × 100) ÷ CP",
    example: {
      title: "Calculate Profit Percentage",
      problem: "Item bought for ₹800 and sold for ₹1000",
      solution: [
        "CP = ₹800",
        "SP = ₹1000",
        "Profit = 1000 - 800 = 200",
        "Profit% = (200 × 100) ÷ 800"
      ],
      result: "25% profit"
    }
  },

  // Special Section
  "Leap Year": {
    title: "Leap Year Calculator",
    category: "Special",
    steps: [
      "Enter year",
      "Check if divisible by 4",
      "Check century year rules",
      "Display result"
    ],
    formula: "Year divisible by 4 AND (not divisible by 100 OR divisible by 400)",
    example: {
      title: "Check Leap Year",
      problem: "Check if 2024 is a leap year",
      solution: [
        "2024 ÷ 4 = 506 (no remainder)",
        "2024 is not a century year",
        "Therefore, 2024 is a leap year"
      ],
      result: "2024 is a leap year"
    }
  },
  "Age Calculator": {
    title: "Age Calculator",
    category: "Special",
    steps: [
      "Enter birth year",
      "Get current year",
      "Calculate difference",
      "Display age"
    ],
    formula: "Age = Current Year - Birth Year",
    example: {
      title: "Calculate Current Age",
      problem: "Calculate age for birth year 1995",
      solution: [
        "Birth Year = 1995",
        "Current Year = 2024",
        "Age = 2024 - 1995"
      ],
      result: "29 years"
    }
  },
  "Days Calculator": {
    title: "Days Calculator",
    category: "Special",
    steps: [
      "Enter year",
      "Check if leap year",
      "Display total days",
      "Show breakdown"
    ],
    formula: "Days = 366 (leap year) or 365 (non-leap year)",
    example: {
      title: "Calculate Days in Year",
      problem: "Find total days in 2024",
      solution: [
        "Check if 2024 is leap year",
        "2024 is divisible by 4",
        "Not a century year",
        "Therefore, leap year"
      ],
      result: "366 days"
    }
  }
}; 