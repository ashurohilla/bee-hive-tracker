"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import Cookies from 'js-cookie';
import { toast } from "sonner"
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Users,
  Flower,
  MapPin,
  Search,
  Filter,
  Plus,
} from "lucide-react";
export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the dashboard
  const stats = {
    totalHives: 156,
    activeBeekeepers: 28,
    floweringCrops: 12,
    pendingApprovals: 5,
  };

  const beekeepers = [
    {
      id: 1,
      name: "John Smith",
      hives: 12,
      location: "North Region",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      hives: 8,
      location: "East Region",
      status: "active",
    },
    {
      id: 3,
      name: "David Chen",
      hives: 15,
      location: "West Region",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      hives: 6,
      location: "South Region",
      status: "inactive",
    },
    {
      id: 5,
      name: "Robert Lee",
      hives: 10,
      location: "Central Region",
      status: "pending",
    },
  ];

  const opportunities = [
    {
      id: 1,
      crop: "Sunflower",
      location: "North Fields",
      flowering: "Apr 10 - Apr 25",
      hivesNeeded: 8,
      currentHives: 3,
    },
    {
      id: 2,
      crop: "Almond",
      location: "East Valley",
      flowering: "May 5 - May 20",
      hivesNeeded: 12,
      currentHives: 0,
    },
    {
      id: 3,
      crop: "Apple",
      location: "West Orchards",
      flowering: "Mar 15 - Apr 5",
      hivesNeeded: 10,
      currentHives: 7,
    },
  ];
  const logout = () => {
    Cookies.remove('token');
     toast("Logout successful redirecting to Home page")

    window.location.href = '/';
  };

  return (
    <div className="justify-center items-center bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Bee Hive Network Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[300px] bg-background"
              />
             
            </div>
            <Link className="hover" href="/dashboard/addcrop" >
            <Button className="float-right flex hover ml-10" variant="outline">
Add Crop           
   </Button>
            </Link>
            <Button onClick={logout} className="float-right hover flex ml-10" variant="destructive">
                Logout
              </Button>
          </div>
        </div>
      </header>

      <main className="flex-1  px-4 py-6">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="beekeepers">Beekeepers</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="map">Network Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Hives
                  </CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalHives}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Beekeepers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.activeBeekeepers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Flowering Crops
                  </CardTitle>
                  <Flower className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.floweringCrops}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently in season
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Approvals
                  </CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">!</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.pendingApprovals}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires attention
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        New hive registered by Maria Garcia
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2h ago
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        Crop calendar updated for Sunflower
                      </div>
                      <div className="text-xs text-muted-foreground">
                        5h ago
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="flex-1">
                        New beekeeper registration pending
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1d ago
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="flex-1">
                        Alert: Low hive density in East Valley
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1d ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Hive Density Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      Heatmap Visualization
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="beekeepers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Beekeeper Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Hives</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {beekeepers.map((beekeeper) => (
                        <TableRow key={beekeeper.id}>
                          <TableCell className="font-medium">
                            {beekeeper.name}
                          </TableCell>
                          <TableCell>{beekeeper.hives}</TableCell>
                          <TableCell>{beekeeper.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                beekeeper.status === "active"
                                  ? "default"
                                  : beekeeper.status === "pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {beekeeper.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Crop</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Flowering Period</TableHead>
                        <TableHead>Hives Needed</TableHead>
                        <TableHead>Current Hives</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {opportunities.map((opportunity) => (
                        <TableRow key={opportunity.id}>
                          <TableCell className="font-medium">
                            {opportunity.crop}
                          </TableCell>
                          <TableCell>{opportunity.location}</TableCell>
                          <TableCell>{opportunity.flowering}</TableCell>
                          <TableCell>{opportunity.hivesNeeded}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                opportunity.currentHives === 0
                                  ? "destructive"
                                  : opportunity.currentHives <
                                      opportunity.hivesNeeded
                                    ? "outline"
                                    : "default"
                              }
                            >
                              {opportunity.currentHives}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Notify
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Network Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full bg-background rounded-md border flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Interactive Map Placeholder
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
