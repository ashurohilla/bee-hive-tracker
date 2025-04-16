"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CropCalendar({
  isAdmin = false,
  crops = [],
}) {
  // Default mock data if no crops are provided
  const defaultCrops = [
    {
      id: "crop1",
      name: "Sunflower",
      floweringStart: new Date(2025, 3, 10), // April 10, 2025
      floweringEnd: new Date(2025, 3, 25), // April 25, 2025
      latitude: 26.9124,
      longitude: 75.7873,
      recommendedHiveDensity: 5,
      location: "Jaipur Region",
    },
    {
      id: "crop2",
      name: "Almond",
      floweringStart: new Date(2025, 1, 15), // Feb 15, 2025
      floweringEnd: new Date(2025, 2, 10), // March 10, 2025
      latitude: 28.7041,
      longitude: 77.1025,
      recommendedHiveDensity: 8,
      location: "Delhi Region",
    },
    {
      id: "crop3",
      name: "Apple",
      floweringStart: new Date(2025, 4, 5), // May 5, 2025
      floweringEnd: new Date(2025, 4, 25), // May 25, 2025
      latitude: 32.2432,
      longitude: 77.1892,
      recommendedHiveDensity: 6,
      location: "Himachal Pradesh",
    },
    {
      id: "crop4",
      name: "Mustard",
      floweringStart: new Date(2025, 0, 10), // Jan 10, 2025
      floweringEnd: new Date(2025, 1, 20), // Feb 20, 2025
      latitude: 27.0238,
      longitude: 74.2179,
      recommendedHiveDensity: 4,
      location: "Rajasthan",
    },
    {
      id: "crop5",
      name: "Mango",
      floweringStart: new Date(2025, 1, 25), // Feb 25, 2025
      floweringEnd: new Date(2025, 2, 30), // March 30, 2025
      latitude: 25.3176,
      longitude: 82.9739,
      recommendedHiveDensity: 7,
      location: "Uttar Pradesh",
    },
  ];

  const cropData = crops.length > 0 ? crops : defaultCrops;

  // State for filters
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined,
    to: Date | undefined,
  }>({
    from: new Date(2025, 0, 1), // Jan 1, 2025
    to: new Date(2025, 11, 31), // Dec 31, 2025
  });
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("timeline");

  // Get unique locations for filter dropdown
  const locations = ["all", ...new Set(cropData.map((crop) => crop.location))];

  // Filter crops based on date range and location
  const filteredCrops = cropData.filter((crop) => {
    const dateInRange =
      (!dateRange.from || crop.floweringEnd >= dateRange.from) &&
      (!dateRange.to || crop.floweringStart <= dateRange.to);
    const locationMatch =
      locationFilter === "all" || crop.location === locationFilter;
    return dateInRange && locationMatch;
  });

  // Generate opportunity alerts for admin view
  const opportunityAlerts = isAdmin
    ? [
        {
          id: "opp1",
          location: "Delhi Region",
          message: "High demand for hives expected in April",
          priority: "high",
        },
        {
          id: "opp2",
          location: "Rajasthan",
          message: "Optimal hive placement needed by January",
          priority: "medium",
        },
        {
          id: "opp3",
          location: "Himachal Pradesh",
          message: "Insufficient hive density for apple flowering",
          priority: "high",
        },
      ]
    : [];

  return (
    <div className="bg-background w-full rounded-lg border p-4 shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Crop Calendar</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d, yyyy")} -{" "}
                        {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) =>
                    setDateRange(range || { from: undefined, to: undefined })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="opportunities">
                Opportunity Alerts
              </TabsTrigger>
            )}
          </TabsList>

          {/* Timeline View Tab */}
          <TabsContent value="timeline" className="mt-4">
            <div className="space-y-4">
              {filteredCrops.length > 0 ? (
                filteredCrops.map((crop) => (
                  <Card key={crop.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{crop.name}</CardTitle>
                        <Badge variant="outline">{crop.location}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Flowering Period
                          </Label>
                          <p className="font-medium">
                            {format(crop.floweringStart, "MMM d, yyyy")} -{" "}
                            {format(crop.floweringEnd, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Location
                          </Label>
                          <p className="font-medium">
                            {crop.latitude.toFixed(4)},{" "}
                            {crop.longitude.toFixed(4)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Recommended Hive Density
                          </Label>
                          <p className="font-medium">
                            {crop.recommendedHiveDensity} hives/acre
                          </p>
                        </div>
                      </div>

                      {/* Visual timeline representation */}
                      <div className="mt-4 relative h-8 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute h-full bg-primary/70 rounded-full"
                          style={{
                            left: `${((new Date(2025, 0, 1).getTime() - new Date(2025, 0, 1).getTime()) / (new Date(2025, 11, 31).getTime() - new Date(2025, 0, 1).getTime())) * 100}%`,
                            width: `${((crop.floweringEnd.getTime() - crop.floweringStart.getTime()) / (new Date(2025, 11, 31).getTime() - new Date(2025, 0, 1).getTime())) * 100}%`,
                            transform: `translateX(${((crop.floweringStart.getTime() - new Date(2025, 0, 1).getTime()) / (new Date(2025, 11, 31).getTime() - new Date(2025, 0, 1).getTime())) * 100}%)`,
                          }}
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
                            {format(crop.floweringStart, "MMM")} -{" "}
                            {format(crop.floweringEnd, "MMM")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No crops found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    No crops match your current filter criteria. Try adjusting
                    your filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Opportunity Alerts Tab (Admin Only) */}
          {isAdmin && (
            <TabsContent value="opportunities" className="mt-4">
              <div className="space-y-4">
                {opportunityAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`border-l-4 ${alert.priority === "high" ? "border-l-red-500" : "border-l-amber-500"}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{alert.location}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                        </div>
                        <Badge
                          variant={
                            alert.priority === "high"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {alert.priority === "high"
                            ? "High Priority"
                            : "Medium Priority"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" className="ml-2">
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Calendar Legend */}
        <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-primary/70 mr-1"></div>
            <span>Flowering Period</span>
          </div>
          {isAdmin && (
            <>
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                <span>Medium Priority</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
