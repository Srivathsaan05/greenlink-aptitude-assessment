
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, Phone } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }).optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine(data => data.email || data.phone, {
  message: "Email or phone number is required",
  path: ["email"],
});

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }).optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.email || data.phone, {
  message: "Email or phone number is required",
  path: ["email"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

const AuthPage: React.FC = () => {
  const { login, signup, loginWithPhone, verifyOTP, isAuthenticated, loading } = useUser();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formLoading, setFormLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  // Handle redirect if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  // OTP form
  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Handle login submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      setFormLoading(true);
      if (loginMethod === 'email' && data.email) {
        await login(data.email, data.password);
      } else if (loginMethod === 'phone' && data.phone) {
        setPhoneNumber(data.phone);
        await loginWithPhone(data.phone);
        setShowOTP(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (data: OTPFormValues) => {
    try {
      setFormLoading(true);
      await verifyOTP(phoneNumber, data.otp);
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle signup submission
  const onSignupSubmit = async (data: SignupFormValues) => {
    try {
      setFormLoading(true);
      if (data.email) {
        await signup(data.email, data.password, data.name, data.phone || '');
      } else if (data.phone) {
        setPhoneNumber(data.phone);
        await loginWithPhone(data.phone, { signUp: true, name: data.name });
        setShowOTP(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md">
          {showOTP ? (
            <Card>
              <CardHeader>
                <CardTitle>Enter Verification Code</CardTitle>
                <CardDescription>
                  We've sent a verification code to {phoneNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="link" 
                  onClick={() => {
                    setShowOTP(false);
                    setLoginMethod('email');
                  }}
                >
                  Back to login
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to GreenLink</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your account
                    </CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        variant={loginMethod === 'email' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setLoginMethod('email')}
                        className="flex gap-2 items-center"
                      >
                        <Mail size={16} />
                        Email
                      </Button>
                      <Button 
                        variant={loginMethod === 'phone' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setLoginMethod('phone')}
                        className="flex gap-2 items-center"
                      >
                        <Phone size={16} />
                        Phone
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        {loginMethod === 'email' ? (
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <FormField
                            control={loginForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 000-0000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {loginMethod === 'email' && (
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={formLoading}
                        >
                          {formLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {loginMethod === 'phone' ? 'Sending code...' : 'Logging in...'}
                            </>
                          ) : (
                            loginMethod === 'phone' ? 'Send Verification Code' : 'Login'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab('signup')}
                    >
                      Don't have an account? Sign up
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Signup Form */}
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                      Join GreenLink to track your aptitude progress
                    </CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        variant={loginMethod === 'email' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setLoginMethod('email')}
                        className="flex gap-2 items-center"
                      >
                        <Mail size={16} />
                        Email
                      </Button>
                      <Button 
                        variant={loginMethod === 'phone' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setLoginMethod('phone')}
                        className="flex gap-2 items-center"
                      >
                        <Phone size={16} />
                        Phone
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                        <FormField
                          control={signupForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {loginMethod === 'email' ? (
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <FormField
                            control={signupForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 000-0000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {loginMethod === 'email' && (
                          <>
                            <FormField
                              control={signupForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={signupForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={formLoading}
                        >
                          {formLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {loginMethod === 'phone' ? 'Sending code...' : 'Creating account...'}
                            </>
                          ) : (
                            loginMethod === 'phone' ? 'Send Verification Code' : 'Sign Up'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab('login')}
                    >
                      Already have an account? Login
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
