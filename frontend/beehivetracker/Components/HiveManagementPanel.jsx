"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";



export default function HiveManagementPanel({
  isAdmin = false,
  beekeepers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alex Johnson" },
  ],
  onSubmit = async () => {},
} ) {
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedBeekeeper, setSelectedBeekeeper] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<HiveFormData>({
    defaultValues: {
      hiveId: "",
      datePlaced: new Date().toISOString().split("T")[0],
      latitude: 0,
      longitude: 0,
      numColonies: 1,
    },
  });

  const watchLatitude = watch("latitude");
  const watchLongitude = watch("longitude");

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await onSubmit(data);

      setSubmitStatus("success");
      setStatusMessage("Hive added successfully!");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("Failed to add hive. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isValidCoordinate = (lat, lng) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  return (
    <Card className="w-full max-w-md bg-black-surface border-black-border shadow-md">
      <CardHeader className="border-b border-black-border">
        <CardTitle className="text-black-primary">Hive Management</CardTitle>
        <CardDescription className="text-black-secondary">
          {isAdmin
            ? "Manage all hives in the network"
            : "Add and manage your hives"}
        </CardDescription>
      </CardHeader>

      {isAdmin && (
        <div className="px-6 mb-4">
          <Tabs defaultValue="add">
            <TabsList className="grid w-full grid-cols-2 bg-black-elevated">
              <TabsTrigger
                value="add"
                className="data-[state=active]:bg-black-surface text-black-primary"
              >
                Add Hive
              </TabsTrigger>
              <TabsTrigger
                value="view"
                className="data-[state=active]:bg-black-surface text-black-primary"
              >
                View All
              </TabsTrigger>
            </TabsList>
            <TabsContent value="add">
              <div className="mb-4">
                <Label htmlFor="beekeeper" className="text-black-primary">
                  Beekeeper
                </Label>
                <Select
                  value={selectedBeekeeper}
                  onValueChange={setSelectedBeekeeper}
                >
                  <SelectTrigger
                    id="beekeeper"
                    className="bg-black-elevated border-black-border text-black-primary"
                  >
                    <SelectValue
                      placeholder="Select beekeeper"
                      className="text-black-secondary"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-black-elevated border-black-border">
                    {beekeepers.map((beekeeper) => (
                      <SelectItem
                        key={beekeeper.id}
                        value={beekeeper.id}
                        className="text-black-primary hover:bg-black-surface"
                      >
                        {beekeeper.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="view">
              <div className="p-4 text-center text-black-muted bg-black-surface rounded-md">
                Hive listing would appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <CardContent className="text-black-primary">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hiveId" className="text-black-primary">
              Hive ID
            </Label>
            <Input
              id="hiveId"
              {...register("hiveId", {
                required: "Hive ID is required",
                pattern: {
                  value: /^[A-Za-z0-9-_]+$/,
                  message:
                    "Hive ID must contain only letters, numbers, hyphens, and underscores",
                },
              })}
              placeholder="HIVE001"
              className="bg-black-elevated border-black-border text-black-primary placeholder:text-black-muted"
            />
            {errors.hiveId && (
              <p className="text-xs text-destructive">
                {errors.hiveId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="datePlaced" className="text-black-primary">
              Date Placed
            </Label>
            <Input
              id="datePlaced"
              type="date"
              {...register("datePlaced", { required: "Date is required" })}
              className="bg-black-elevated border-black-border text-black-primary"
            />
            {errors.datePlaced && (
              <p className="text-xs text-destructive">
                {errors.datePlaced.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-black-primary">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="0.0001"
                {...register("latitude", {
                  required: "Latitude is required",
                  min: {
                    value: -90,
                    message: "Minimum latitude is -90",
                  },
                  max: {
                    value: 90,
                    message: "Maximum latitude is 90",
                  },
                  valueAsNumber: true,
                })}
                placeholder="28.7041"
                className="bg-black-elevated border-black-border text-black-primary placeholder:text-black-muted"
              />
              {errors.latitude && (
                <p className="text-xs text-destructive">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-black-primary">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="0.0001"
                {...register("longitude", {
                  required: "Longitude is required",
                  min: {
                    value: -180,
                    message: "Minimum longitude is -180",
                  },
                  max: {
                    value: 180,
                    message: "Maximum longitude is 180",
                  },
                  valueAsNumber: true,
                })}
                placeholder="77.1025"
                className="bg-black-elevated border-black-border text-black-primary placeholder:text-black-muted"
              />
              {errors.longitude && (
                <p className="text-xs text-destructive">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          {watchLatitude && watchLongitude && (
            <div className="text-xs text-black-muted">
              {isValidCoordinate(Number(watchLatitude), Number(watchLongitude))
                ? "✓ Valid coordinates"
                : "⚠️ Invalid coordinates range"}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="numColonies" className="text-black-primary">
              Number of Colonies
            </Label>
            <Input
              id="numColonies"
              type="number"
              min="1"
              {...register("numColonies", {
                required: "Number of colonies is required",
                min: {
                  value: 1,
                  message: "Minimum number of colonies is 1",
                },
                valueAsNumber: true,
              })}
              placeholder="5"
              className="bg-black-elevated border-black-border text-black-primary placeholder:text-black-muted"
            />
            {errors.numColonies && (
              <p className="text-xs text-destructive">
                {errors.numColonies.message}
              </p>
            )}
          </div>

          {submitStatus !== "idle" && (
            <Alert
              variant={submitStatus === "success" ? "default" : "destructive"}
              className={
                submitStatus === "success"
                  ? "bg-black-elevated border-black-border"
                  : ""
              }
            >
              {submitStatus === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription
                className={
                  submitStatus === "success" ? "text-black-primary" : ""
                }
              >
                {statusMessage}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>

      <CardFooter className="border-t border-black-border">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Add Hive"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
