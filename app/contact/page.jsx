'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { sendContactForm } from '@/lib/api';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '(+995) 597 08 22 11',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'xarshiladzeirakli@gmail.com',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Address',
    description: 'Tbilisi, Georgia',
  },
];

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendContactForm(formData);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        description: '',
      });
      setIsLoading(false);
      toast({ title: 'Your message was sent' });
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      toast({ title: error.message, variant: 'destructive' });
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: 'easeIn',
        },
      }}
      className="py-6"
    >
      <Toaster />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] bg-green">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              onSubmit={submitForm}
            >
              <h3 className="text-4xl text-accent">Let&apos;s work together</h3>
              {error && <p className="text-red-800">{error}</p>}
              <p className="text-white/60">
                Feel free to reach out with offers.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="firstname"
                  name="firstname"
                  placeholder="Firstname"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="lastname"
                  name="lastname"
                  required
                  placeholder="Lastname"
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  onChange={handleChange}
                />
                <Input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  onChange={handleChange}
                />
              </div>
              {/* select */}
              {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="est">Web Development</SelectItem>
                    <SelectItem value="cest">Web Development</SelectItem>
                    <SelectItem value="ces">Web Development</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
              {/* textarea */}
              <Textarea
                className="h-[200px]"
                name="description"
                placeholder="Type your message here."
                onChange={handleChange}
              />
              {/* btn */}
              <Button
                disabled={isLoading ? true : false}
                size="md"
                className="max-w-40"
                type="submit"
              >
                Send message
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Contact;
