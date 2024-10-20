"use client";

import React, { useState, useEffect } from 'react';
import { CheckIcon, HelpCircleIcon, ArrowRightIcon, BadgePercent, Sun, Moon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion, AnimatePresence } from 'framer-motion';

// Define the structure of a pricing plan
interface Plan {
  name: string; // Name of the plan
  price: number | string; // Price of the plan
  originalPrice?: number; // Original price for discount display
  credits?: number; // Number of credits included in the plan
  description?: string; // Description of the plan
  features: string[]; // List of features included in the plan
  cta: string; // Call to action text
  additionalFeatures?: string[]; // Additional features for the plan
  popular?: boolean; // Flag to indicate if the plan is popular
}

const PricingComponent = () => {
  // State to manage billing cycle (monthly or annual)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  // State to track the selected plan
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  // State to control the visibility of the comparison dialog
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  // State to manage the theme (light or dark)
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // State to track the scroll position
  const [scrollY, setScrollY] = useState(0);

  // Load images on component mount
  useEffect(() => {
    const images = ['pricing-bg.jpg', 'logo.svg'];
    images.forEach((image) => {
      const img = new Image();
      img.src = `/images/${image}`;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scrollY on scroll
    };

    window.addEventListener('scroll', handleScroll); // Add event listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up
    };
  }, []);

  // Define the available pricing plans
  const plans: Plan[] = [
    {
      name: 'Trial',
      price: 'Try now',
      description: 'Get personalised template',
      features: [
        '25+ data sources',
        'GPT4, LinkedIn and others',
        'Access to slack community',
        '10+ templates to scale your outbound',
      ],
      cta: 'Try Now',
      additionalFeatures: ['Explore product capabilities'],
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? 229 : 2290,
      originalPrice: billingCycle === 'monthly' ? 459 : 4590,
      credits: 8000,
      features: [
        'Webhook, HTTP API',
        'Credit rollover (upto 2x plan credits)',
        'Outbound email integrations like Instantly, Smartlead.',
        'Dedicated 3 hours from Bitscale expert',
      ],
      cta: 'Continue with Growth',
      additionalFeatures: [
        'Unlimited leads search',
        'Fully enriched 5000 leads',
        'Personalized outreach at scale',
      ],
    },
    {
      name: 'Booster',
      price: billingCycle === 'monthly' ? 499 : 4990,
      originalPrice: billingCycle === 'monthly' ? 999 : 9990,
      credits: 25000,
      popular: true,
      features: [
        'Webhook, HTTP API',
        'Credit rollover (upto 2x plan credits)',
        'Outbound email integrations like Instantly, Smartlead.',
        'Dedicated 3 hours from Bitscale expert',
        'Advanced models like Claude Sonnet',
        'Dedicated 8 hours from Bitscale expert',
        '2 way Hubspot integration',
      ],
      cta: 'Continue with Booster',
      additionalFeatures: [
        'Unlimited leads search',
        'Fully enriched 15000 leads',
        'Personalized outreach at scale',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      description: 'For individual pricing',
      features: [
        'Data privacy certification',
        'Priority Support',
        'Dedicated Bitscale expert',
        'Private Slack Channel',
        'Collaborative workspace and templates',
      ],
      cta: 'Try Now',
      additionalFeatures: [
        'Perfect for High-Volume End-to-End CRM Data Enrichment',
        'Unlimited list of leads with unlimited data points',
      ],
    },
  ];

  // Function to handle plan selection
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    console.log(`Plan selected: ${planName}`);
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); // Toggle theme state
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
    {/* Add animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500 rounded-full opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
      <div className="max-w-7xl mx-auto relative">
        {/* Theme toggle bar */}
        <div className="flex justify-end mb-4">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="flex items-center p-2 bg-gray-200 rounded-full shadow-md">
            {isDarkTheme ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-800" />}
          </button>
        </div>

        {/* Header section*/}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ y: scrollY * -0.2 }} // Parallax effect
        >
          <h1 className={`text-5xl font-extrabold text-center mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Pricing that scales with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              your growth
            </span>
          </h1>
          <p className={`text-xl text-center mb-12 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Designed for every stage of your journey. <br />Start today, no credit card required.
          </p>
        </motion.div>

        {/* Billing cycle toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className={`bg-white rounded-full p-1 shadow-lg flex items-center ${isDarkTheme ? 'bg-gray-800' : ''}`}>
            <span className={`px-4 py-2 ${billingCycle === 'monthly' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Monthly</span>
            <Switch
              checked={billingCycle === 'annual'}
              onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="mx-2"
            />
            <span className={`px-4 py-2 ${billingCycle === 'annual' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Annual</span>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="h-full"
              >
                <Card 
                  className={`overflow-hidden transition-all duration-300 relative flex flex-col h-full card-glow
                    ${plan.popular ? 'border-blue-500 border-2 transform hover:scale-105' : 'hover:border-blue-300'}
                    ${index === 2 ? 'bg-gradient-to-b from-blue-900 to-blue-700' : (isDarkTheme ? 'bg-gray-800' : 'bg-white')}
                  `}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 font-bold rounded-bl-md">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <h3 className={`text-2xl font-bold ${index === 2 ? 'text-white' : ''}`}>{plan.name}</h3>
                    {typeof plan.price === 'number' && plan.originalPrice && (
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <motion.div
                            key={billingCycle} // Key to trigger re-animation
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }} 
                          >
                            <span className={`text-4xl font-extrabold ${index === 2 ? 'text-white' : ''}`}>${plan.price}</span>
                          </motion.div>
                          <span className={`ml-1 ${index === 2 ? 'text-blue-100' : 'text-gray-500'}`}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${index === 2 ? 'bg-blue-200 text-green-800' : 'bg-green-100 text-green-800'}`}>
                            <BadgePercent className="mr-1.5 h-4 w-4 text-green-600" />
                            50% off
                          </span>
                          <span className={`ml-2 ${index === 2 ? 'text-blue-200' : 'text-gray-500'} line-through font-bold`}>${plan.originalPrice}</span>
                        </div>
                      </div>
                    )}
                    {plan.price === 'Contact Us' && (
                      <span className="text-3xl font-extrabold">Contact Us</span> 
                    )}
                    {plan.price === 'Try now' && (
                      <span className="text-3xl font-extrabold">Try Now</span> 
                    )}
                    {typeof plan.price === 'number' && !plan.originalPrice && (
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-extrabold">${plan.price}</span>
                        <span className={`ml-1 ${index === 2 ? 'text-blue-100' : 'text-gray-500'}`}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                    )}
                    {plan.credits && (
                      <div className={`mt-2 ${index === 2 ? 'text-blue-100' : 'text-blue-600'} font-semibold`}>
                        {plan.credits.toLocaleString()} Credits
                      </div>
                    )}
                    {plan.description && (
                      <p className={`mt-2 text-sm ${index === 2 ? 'text-blue-100' : 'text-gray-500'}`}>{plan.description}</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className={`h-5 w-5 ${index === 2 ? 'text-blue-200' : 'text-green-500'} flex-shrink-0`} />
                          <span className={`ml-3 text-sm ${index === 2 ? 'text-blue-50' : 'text-gray-600'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.additionalFeatures && (
                      <div className="mt-auto">
                        <hr className={`my-6 w-full mx-auto ${index === 2 ? 'border-blue-300' : 'border-blue-500'}`} />
                        <ul className="space-y-2">
                          {plan.additionalFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckIcon className={`h-4 w-4 ${index === 2 ? 'text-blue-200' : 'text-blue-500'} flex-shrink-0`} />
                              <span className={`ml-2 text-xs ${index === 2 ? 'text-blue-50' : 'text-gray-600'}`}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button 
                      className={`w-full group ${index === 2 ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                      onClick={() => handlePlanSelect(plan.name)} // Handle plan selection
                      aria-label={`Select ${plan.name} plan`}
                    >
                      {plan.cta}
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison button and tooltip */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  onClick={() => setIsComparisonOpen(true)}
                  className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-blue-600'} hover:underline transition-all duration-300`}
                >
                  Compare Plans <HelpCircleIcon className="ml-1 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see a detailed comparison of all plans</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Comparison dialog */}
        <Dialog open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Plan Comparison</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Feature</TableHead>
                  {plans.map((plan) => (
                    <TableHead key={plan.name} className="font-bold">{plan.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Iterates over all features from all plans */}
                {plans.flatMap(plan => plan.features).map((feature, index) => (
                  <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                    <TableCell>{feature}</TableCell>
                    {plans.map((plan) => (
                      <TableCell key={plan.name}>
                        {plan.features.includes(feature) ? (
                          <CheckIcon className="text-green-500 h-5 w-5" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PricingComponent;
