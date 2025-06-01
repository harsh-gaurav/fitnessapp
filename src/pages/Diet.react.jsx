import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  Paper,
  Alert,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HomeHeader from "../components/header/HomeHeader.react";

const Diet = () => {
  const [foodDiet, setFoodDiet] = useState([]);
  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState(""); // in cm
  const [weight, setWeight] = useState(""); // in kg
  const [age, setAge] = useState(""); // in years
  const [category, setCategory] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [foodRecommendations, setFoodRecommendations] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("userID")) {
      alert("Please Login");
      navigate("/");
    }
  }, [navigate]);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (h > 0 && w > 0 && a > 0) {
      const bmiVal = w / (h * h);
      setBmi(bmiVal.toFixed(1));

      // Determine age category
      let ageCat = "";
      if (a < 18) ageCat = "Child/Teen";
      else if (a >= 18 && a < 25) ageCat = "Young Adult";
      else if (a >= 25 && a < 40) ageCat = "Adult";
      else if (a >= 40 && a < 60) ageCat = "Middle Age";
      else ageCat = "Senior";
      setAgeCategory(ageCat);

      // Adjust BMI categories based on age
      let bmiCategory = "";
      if (a >= 65) {
        // Different BMI ranges for seniors
        if (bmiVal < 22) bmiCategory = "Underweight";
        else if (bmiVal >= 22 && bmiVal < 27) bmiCategory = "Normal";
        else if (bmiVal >= 27 && bmiVal < 32) bmiCategory = "Overweight";
        else bmiCategory = "Obese";
      } else if (a < 18) {
        // For children/teens, use percentile-based approach (simplified)
        if (bmiVal < 16) bmiCategory = "Underweight";
        else if (bmiVal >= 16 && bmiVal < 23) bmiCategory = "Normal";
        else if (bmiVal >= 23 && bmiVal < 27) bmiCategory = "Overweight";
        else bmiCategory = "Obese";
      } else {
        // Standard adult BMI ranges
        if (bmiVal < 18.5) bmiCategory = "Underweight";
        else if (bmiVal >= 18.5 && bmiVal < 24.9) bmiCategory = "Normal";
        else if (bmiVal >= 25 && bmiVal < 29.9) bmiCategory = "Overweight";
        else bmiCategory = "Obese";
      }

      setCategory(bmiCategory);
      setFoodRecommendations(getFoodRecommendations(bmiCategory, ageCat));
    } else {
      alert("Please enter valid height, weight, and age.");
    }
  };

  const getFoodRecommendations = (bmiCategory, ageCategory) => {
    const baseRecommendations = {
      Underweight: {
        title: "Weight Gain Foods",
        description: "Focus on nutrient-dense, calorie-rich foods",
        goodFoods: [
          "Nuts and nut butters", "Avocados", "Whole grain breads", "Lean meats and fish",
          "Dairy products", "Olive oil", "Protein shakes", "Dried fruits", "Quinoa and brown rice", "Eggs"
        ],
        avoidFoods: [
          "Diet sodas", "Low-fat products", "Excessive caffeine", "Processed junk food", "Sugary drinks without nutrients"
        ],
        tips: ["Eat every 2-3 hours", "Add healthy fats to meals", "Drink calorie-rich beverages", "Focus on strength training"]
      },
      Normal: {
        title: "Maintenance Foods",
        description: "Balanced nutrition to maintain healthy weight",
        goodFoods: [
          "Fruits and vegetables", "Lean proteins", "Whole grains", "Fish and seafood",
          "Legumes and beans", "Greek yogurt", "Nuts in moderation", "Olive oil", "Green tea", "Water"
        ],
        avoidFoods: [
          "Processed foods", "Sugary snacks", "Fried foods", "Excessive alcohol", "Refined sugars"
        ],
        tips: ["Maintain portion control", "Stay hydrated", "Include variety in diet", "Regular exercise"]
      },
      Overweight: {
        title: "Weight Loss Foods",
        description: "Low-calorie, nutrient-dense foods for weight loss",
        goodFoods: [
          "Leafy green vegetables", "Lean proteins (chicken, fish)", "Berries and citrus fruits", "Whole grains (small portions)",
          "Legumes", "Green tea", "Water", "Cucumber", "Broccoli and cauliflower", "Greek yogurt (low-fat)"
        ],
        avoidFoods: [
          "Fried foods", "Sugary drinks", "White bread and pasta", "Candy and sweets",
          "High-fat dairy", "Processed snacks", "Alcohol", "Fast food"
        ],
        tips: ["Create a calorie deficit", "Eat more vegetables", "Drink water before meals", "Increase physical activity"]
      },
      Obese: {
        title: "Weight Loss Foods (Intensive)",
        description: "Very low-calorie, high-nutrition foods",
        goodFoods: [
          "Non-starchy vegetables", "Lean proteins", "Berries (small portions)", "Green leafy vegetables",
          "Fish and seafood", "Egg whites", "Herbal teas", "Water", "Cucumber and celery", "Zucchini"
        ],
        avoidFoods: [
          "All fried foods", "Sugary beverages", "Refined carbs", "High-fat foods",
          "Processed foods", "Alcohol", "Desserts", "Fast food", "High-calorie snacks"
        ],
        tips: ["Consult a healthcare provider", "Focus on whole foods", "Meal prep and planning", "Start with low-impact exercise"]
      }
    };

    // Get base recommendations
    let recommendations = baseRecommendations[bmiCategory] || baseRecommendations.Normal;

    // Modify recommendations based on age category
    if (ageCategory === "Child/Teen") {
      recommendations = {
        ...recommendations,
        title: `${recommendations.title} (For Teens)`,
        description: `${recommendations.description} - Focus on growth and development`,
        goodFoods: [...recommendations.goodFoods, "Milk and dairy", "Calcium-rich foods", "Iron-rich foods", "Whole fruits"],
        tips: [...recommendations.tips, "Get adequate sleep", "Stay active with sports", "Limit screen time during meals"]
      };
    } else if (ageCategory === "Young Adult") {
      recommendations = {
        ...recommendations,
        title: `${recommendations.title} (Young Adult)`,
        tips: [...recommendations.tips, "Build healthy habits early", "Stay active", "Limit alcohol consumption"]
      };
    } else if (ageCategory === "Senior") {
      recommendations = {
        ...recommendations,
        title: `${recommendations.title} (Senior)`,
        description: `${recommendations.description} - Focus on bone health and muscle maintenance`,
        goodFoods: [...recommendations.goodFoods, "Calcium supplements", "Vitamin D sources", "Soft proteins", "Fiber-rich foods"],
        tips: [...recommendations.tips, "Stay hydrated", "Consider supplements", "Eat smaller frequent meals", "Focus on nutrient density"]
      };
    }

    return recommendations;
  };

  const getDietType = (bmiCategory) => {
    switch (bmiCategory) {
      case "Underweight":
        return "high-protein";
      case "Normal":
        return "balanced";
      case "Overweight":
      case "Obese":
        return "low-fat";
      default:
        return "balanced";
    }
  };

  const fetchDietData = async (bmiCategory) => {
    const dietType = getDietType(bmiCategory);
    const url = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&random=true&diet[0]=${dietType}`;
    const options = {
      method: "GET",
      headers: {
        "Accept-Language": "en",
        "X-RapidAPI-Key": process.env.REACT_APP_RECIEPE_API_KEY,
        "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFoodDiet(result?.hits || []);
    } catch (error) {
      console.error("Error fetching diet data:", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchDietData(category);
    }
  }, [category]);

  return (
    <>
      <HomeHeader />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          py: 4,
        }}
      >
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          className="text-gradient"
          sx={{ fontSize: { lg: "3rem", xs: "2rem" }, textAlign: "center" }}
        >
          Know Yourself and Get Food Suggestions
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 600, backgroundColor: "white" }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3, color: "black" }}>
            📊 Calculate for Health
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <TextField
              label="Heart Rate"
              variant="outlined"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              sx={{
                minWidth: 120,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.6)',
                }
              }}
            />
            <TextField
              label="spO2"
              variant="outlined"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              sx={{
                minWidth: 120,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.6)',
                }
              }}
            />
            <TextField
              label="Steps Count"
              variant="outlined"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              sx={{
                minWidth: 120,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.6)',
                }
              }}
            />
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              onClick={calculateBMI}
              sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
            >
              Calculate
            </Button>
          </Box>
        </Paper>

        {bmi && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, width: "100%", maxWidth: 800, backgroundColor: "white" }}>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2, color: "black" }}>
              📊 Your Result
            </Typography>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2, color: "primary.main" }}>
              Value: <strong>{bmi}</strong>
            </Typography>

          </Paper>
        )}

        {foodRecommendations && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 1000, backgroundColor: "white" }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3, color: "black" }}>
              🍽️ {foodRecommendations.title}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}>
              {foodRecommendations.description}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
              {/* Good Foods */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "success.main", display: "flex", alignItems: "center", gap: 1 }}>
                  ✅ Foods to Include
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {foodRecommendations.goodFoods.map((food, index) => (
                    <Chip
                      key={index}
                      label={food}
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              {/* Foods to Avoid */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "error.main", display: "flex", alignItems: "center", gap: 1 }}>
                  ❌ Foods to Avoid
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {foodRecommendations.avoidFoods.map((food, index) => (
                    <Chip
                      key={index}
                      label={food}
                      color="error"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Tips */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "info.main" }}>
                💡 Helpful Tips
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {foodRecommendations.tips.map((tip, index) => (
                  <Chip
                    key={index}
                    label={tip}
                    color="info"
                    variant="filled"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        )}

        {foodDiet.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
              mt: 4,
            }}
          >
            {foodDiet.map((item, index) => (
              <Link
                to={item.recipe.url}
                key={index}
                className="link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card sx={{ maxWidth: 345, textDecoration: "none" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.recipe.image}
                    alt={item.recipe.label}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.recipe.label}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.recipe.healthLabels.slice(0, 5).map((hl) => (
                        <Chip key={hl} label={hl} />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      Explore <ArrowForward />
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Diet;
