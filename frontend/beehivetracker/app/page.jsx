"use client";

import { ThemeSwitcher } from "../Components/theme-switcher";
import InteractiveMap from "../Components/InteractiveMap";
import { useTheme } from "next-themes";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Flower,
  Leaf,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "../src/components/ui/button";

export default function Page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black-theme">
      <header className="border-b border-black-border bg-gray-200  sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Flower className="h-6 w-6 text-amber-400" />
            <h1 className="text-2xl font-bold text-black-primary">
              Hive Management
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              href="/login"
              className="text-black-primary hover:text-amber-400 transition-colors"
            >
              Login
            </Link>
            <Link
              href="register"
              className="text-black-primary hover:text-amber-400 transition-colors"
            >
              Register
            </Link>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-primary">
                Smart Bee Hive{" "}
                <span className="text-amber-400">Management</span>
              </h1>
              <p className="text-xl text-black-secondary mb-6">
                Optimize pollination with intelligent hive placement and
                monitoring
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-black-border text-black-primary"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1568526381923-caf3fd520382?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bee on honeycomb"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-400 p-3 rounded-lg shadow-lg">
                <Leaf className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-black-primary">
            Interactive Hive Map
          </h2>
          <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
            <InteractiveMap />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-black-primary">
            Hive Network Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black-surface p-6 rounded-xl border border-black-border shadow-md transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                  <Flower className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium text-lg text-black-primary">
                  Active Hives
                </h3>
              </div>
              <p className="text-4xl font-bold text-green-500">24</p>
              <p className="text-black-secondary mt-2 text-sm">
                +3 from last month
              </p>
            </div>
            <div className="bg-black-surface p-6 rounded-xl border border-black-border shadow-md transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium text-lg text-black-primary">
                  Flowering Crops
                </h3>
              </div>
              <p className="text-4xl font-bold text-blue-500">12</p>
              <p className="text-black-secondary mt-2 text-sm">
                Currently in season
              </p>
            </div>
            <div className="bg-black-surface p-6 rounded-xl border border-black-border shadow-md transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-medium text-lg text-black-primary">
                  Optimal Placements
                </h3>
              </div>
              <p className="text-4xl font-bold text-purple-500">8</p>
              <p className="text-black-secondary mt-2 text-sm">
                Ready for deployment
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-black-surface border border-black-border rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-black-primary">
                  Join Our Beekeeping Network
                </h2>
                <p className="text-black-secondary mb-6">
                  Connect with other beekeepers, share insights, and contribute
                  to sustainable agriculture practices.
                </p>
                <Link href="register">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Register Now
                </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661851293346-dfd1f54773bc?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Beekeeper with hive"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black-surface border-t border-black-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flower className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-black-primary">
                  Hive Management
                </h3>
              </div>
              <p className="text-black-secondary mb-4">
                Optimizing pollination through intelligent hive placement and
                monitoring.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-black-secondary hover:text-amber-400"
                >
                 
                </a>
                <a
                  href="#"
                  className="text-black-secondary hover:text-amber-400"
                >
                  {/* <Github className="h-5 w-5" /> */}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black-primary mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black-primary mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black-secondary hover:text-amber-400"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black-primary mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-black-secondary">
                  Email: info@hivemanagement.com
                </li>
                <li className="text-black-secondary">
                  Phone: +1 (555) 123-4567
                </li>
                <li className="text-black-secondary">
                  Address: 123 Bee Street, Honey Valley
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black-border text-center text-black-secondary">
            <p>
              &copy; {new Date().getFullYear()} Hive Management. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
