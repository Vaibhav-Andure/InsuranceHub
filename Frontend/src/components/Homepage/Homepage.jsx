// import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Box } from "@mui/material"
// import { Link, useNavigate } from 'react-router-dom';
// import { styled } from "@mui/system"
// import { Shield, Umbrella, Favorite, Group } from "@mui/icons-material"

// import insurerImage from "./insurer.jpg";




// const HeroSection = styled("div")(({ theme }) => ({
//   backgroundImage: `url(${insurerImage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   height: "70vh",
//   display: "flex",
//   alignItems: "center",
//   color: "white",
//   position: "relative",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// }))

// const FeatureIcon = styled(Box)(({ theme }) => ({
//   fontSize: "3rem",
//   marginBottom: theme.spacing(2),
//   color: theme.palette.primary.main,
// }))


// const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       {/* <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.main", fontWeight: "bold" }}>
//             InsureHub
//           </Typography>
//                       <button
//               className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
//               onClick={() => navigate("/login")}
//             >
//             Login
//             </button>
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               onClick={() => navigate("/register")}
//             >
//               Register
//             </button>
//         </Toolbar>
//       </AppBar> */}

//       <HeroSection>
//         <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Welcome to InsuranceHub
//           </Typography>
//           <Typography variant="h5" paragraph>
//             Your one-stop solution for all insurance needs. Secure your future today with our comprehensive coverage
//             options.
//           </Typography>
//           <Button variant="contained" size="large" color="primary">
//             Explore Now
//           </Button>
//         </Container>
//       </HeroSection>



// <Container maxWidth="lg" sx={{ my: 8 }}>
//         <Typography variant="h3" component="h2" align="center" gutterBottom>
//           Why Choose InsuranceHub?
//         </Typography>
//         <Grid container spacing={4} sx={{ mt: 4 }}>
//           {[
//             {
//               icon: <Shield />,
//               title: "Comprehensive Coverage",
//               description: "Get protection for all aspects of your life",
//             },
//             {
//               icon: <Umbrella />,
//               title: "Customizable Plans",
//               description: "Tailor your insurance to fit your unique needs",
//             },
//             {
//               icon: <Favorite />,
//               title: "Health First",
//               description: "Prioritize your well-being with our health plans",
//             },
//             { icon: <Group />, title: "Family Protection", description: "Secure the future of your loved ones" },
//           ].map((feature, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                   transition: "transform 0.3s, box-shadow 0.3s",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 3,
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <FeatureIcon
//                     sx={{
//                       "&:hover": {
//                         color: "secondary.main",
//                       },
//                     }}
//                   >
//                     {feature.icon}
//                   </FeatureIcon>
//                   <Typography variant="h5" component="h3" gutterBottom>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* <Box sx={{ bgcolor: "grey.100", py: 8 }}>
//         <Container maxWidth="lg">
//           <Typography variant="h3" component="h2" align="center" gutterBottom>
//             What Our Customers Say
//           </Typography>
//           <Grid container spacing={4} sx={{ mt: 4 }}>
//             {[
//               {
//                 name: "Abhay D. Tambe ",
//                 quote: "InsuranceHub made finding the right insurance plan a breeze. Highly recommended!",
//               },
//               {
//                 name: "Vaibhav Andure",
//                 quote: "The customer service at InsuranceHub is top-notch. They really care about their clients.",
//               },
//               {
//                 name: "Ajinkya Purekar",
//                 quote: "I feel secure knowing that InsuranceHub has my back. Great coverage at affordable prices.",
//               },
//             ].map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card elevation={2}>
//                   <CardContent>
//                     <Typography variant="body1" paragraph>
//                       "{testimonial.quote}"
//                     </Typography>
//                     <Typography variant="subtitle1" color="primary">
//                       {testimonial.name}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box> */}
//       <Box sx={{ bgcolor: "grey.100", py: 8 }}>
//   <Container maxWidth="lg">
//     <Typography variant="h3" component="h2" align="center" gutterBottom>
//       What Our Customers Say
//     </Typography>
//     <Grid container spacing={4} sx={{ mt: 4 }}>
//       {[
//         {
//           name: "Abhay D. Tambe",
//           quote: "InsuranceHub made finding the right insurance plan a breeze. Highly recommended!",
//         },
//         {
//           name: "Vaibhav Andure",
//           quote: "The customer service at InsuranceHub is top-notch. They really care about their clients.Best Insurance platfrom",
//         },
//         {
//           name: "Ajinkya Purekar",
//           quote: "I feel secure knowing that InsuranceHub has my back. Great coverage at affordable prices and Easy to manage",
//         },
//       ].map((testimonial, index) => (
//         <Grid item xs={12} md={4} key={index}>
//           <Card
//             elevation={2}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               height: '100%', // Ensures all cards are the same height
//               transition: "transform 0.3s, box-shadow 0.3s",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: 4,
//               },
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Typography variant="body1" paragraph>
//                 "{testimonial.quote}"
//               </Typography>
//               <Typography variant="subtitle1" color="primary">
//                 {testimonial.name}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   </Container>
// </Box>

//       <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" gutterBottom>
//                 InsuranceHub
//               </Typography>
//               <Typography variant="body2">Securing your future, one policy at a time.</Typography>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" gutterBottom>
//                 Quick Links
//               </Typography>
//               <Typography variant="body2">
//                 <Box component="span" sx={{ display: "block", mb: 1 }}>
//                   <Button color="inherit" sx={{ p: 0 }}>
//                     About Us
//                   </Button>
//                 </Box>
//                 <Box component="span" sx={{ display: "block", mb: 1 }}>
//                   <Button color="inherit" sx={{ p: 0 }}>
//                     Our Services
//                   </Button>
//                 </Box>
//                 <Box component="span" sx={{ display: "block" }}>
//                   <Button color="inherit" sx={{ p: 0 }}>
//                     Contact Us
//                   </Button>
//                 </Box>
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" gutterBottom>
//                 Connect With Us
//               </Typography>
//               <Typography variant="body2">
              
//                 <Box component="span" sx={{ display: "block" }}>
//                 <a href="https://www.linkedin.com/in/abhay-tambe-39a675251" target="_blank" rel="noopener noreferrer">
    
//                   <Button color="inherit" sx={{ p: 0 }}>
//                     Abhay Tambe
//                   </Button>
//                   </a>
//                 </Box>

//                 <Box component="span" sx={{ display: "block" }}>
//                 <a href="https://www.linkedin.com/in/vaibhav-andure-aab4b725b" target="_blank" rel="noopener noreferrer">
    
//                   <Button color="inherit" sx={{ p: 0 }}>
//                    Vaibhav Andure
//                   </Button>
//                   </a>
//                 </Box>

//                 <Box component="span" sx={{ display: "block" }}>
//                 <a href="https://www.linkedin.com/in/ajinkya-purekar-67527b256" target="_blank" rel="noopener noreferrer">
    
//                   <Button color="inherit" sx={{ p: 0 }}>
//                     Ajinkya Purekar
//                   </Button>
//                   </a>
//                 </Box>
//               </Typography>
//             </Grid>
//           </Grid>
//           <Typography variant="body2" color="grey.500" align="center" sx={{ mt: 4 }}>
//             © 2025 InsuranceHub. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </div>
//   )
// }

// export default Homepage



import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Box } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from "@mui/system";
import { Shield, Umbrella, Favorite, Group } from "@mui/icons-material";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import insurerImage from "./insurer.jpg";

const HeroSection = styled("div")(({ theme }) => ({
  backgroundImage: `url(${insurerImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  color: "white",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Abhay D. Tambe",
      quote: "InsuranceHub made finding the right insurance plan a breeze. Highly recommended!",
    },
    {
      name: "Vaibhav Andure",
      quote: "The customer service at InsuranceHub is top-notch. They really care about their clients. Best Insurance platform.",
    },
    {
      name: "Ajinkya Purekar",
      quote: "I feel secure knowing that InsuranceHub has my back. Great coverage at affordable prices and easy to manage.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
   
  };

  return (
    <Box sx={{ bgcolor: "grey.100", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          What Our Customers Say
        </Typography>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card
                elevation={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'center',
                  height: '100%', // Ensures all cards are the same height
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>
    </Box>
 
  );
};

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Uncomment the AppBar if needed */}
      {/* <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.main", fontWeight: "bold" }}>
            InsureHub
          </Typography>
          <button
            className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </Toolbar>
      </AppBar> */}

      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to InsuranceHub
          </Typography>
          <Typography variant="h5" paragraph>
            Your one -stop solution for all insurance needs. Secure your future today with our comprehensive coverage options.
          </Typography>
          <Button variant="contained" size="large" color="primary">
            Explore Now
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose InsuranceHub?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              icon: <Shield />,
              title: "Comprehensive Coverage",
              description: "Get protection for all aspects of your life",
            },
            {
              icon: <Umbrella />,
              title: "Customizable Plans",
              description: "Tailor your insurance to fit your unique needs",
            },
            {
              icon: <Favorite />,
              title: "Health First",
              description: "Prioritize your well-being with our health plans",
            },
            { icon: <Group />, title: "Family Protection", description: "Secure the future of your loved ones" },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <FeatureIcon
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <TestimonialsCarousel />

      <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                InsuranceHub
              </Typography>
              <Typography variant="body2">Securing your future, one policy at a time.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ display: "block", mb: 1 }}>
                  <Button color="inherit" sx={{ p: 0 }}>
                    About Us
                  </Button>
                </Box>
                <Box component="span" sx={{ display: "block", mb: 1 }}>
                  <Button color="inherit" sx={{ p: 0 }}>
                    Our Services
                  </Button>
                </Box>
                <Box component="span" sx={{ display: "block" }}>
                  <Button color="inherit" sx={{ p: 0 }}>
                    Contact Us
                  </Button>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ display: "block" }}>
                  <a href="https://www.linkedin.com/in/abhay-tambe-39a675251" target="_blank" rel="noopener noreferrer">
                    <Button color="inherit" sx={{ p: 0 }}>
                      Abhay Tambe
                    </Button>
                  </a>
                </Box>
                <Box component="span" sx={{ display: "block" }}>
                  <a href="https://www.linkedin.com/in/vaibhav-andure-aab4b725b" target="_blank" rel="noopener noreferrer">
                    <Button color="inherit" sx={{ p: 0 }}>
                      Vaibhav Andure
                    </Button>
                  </a>
                </Box>
                <Box component="span" sx={{ display: "block" }}>
                  <a href="https://www.linkedin.com/in/ajinkya-purekar-67527b256" target="_blank" rel="noopener noreferrer">
                    <Button color="inherit" sx={{ p: 0 }}>
                      Ajinkya Purekar
                    </Button>
 </a>
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="grey.500" align="center" sx={{ mt: 4 }}>
            © 2025 InsuranceHub. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Homepage;