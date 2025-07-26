import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Shield, Users, Package, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">GroupBuy Platform</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Connect vendors for bulk purchasing. Join group orders, save money, and build stronger business relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vendor Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-elevated border-0 hover:shadow-button transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">For Vendors</CardTitle>
              <CardDescription className="text-base">
                Join group orders to get better wholesale prices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Join existing group orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Track order status in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <span>Save on bulk purchasing</span>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Link to="/vendor/signup" className="block">
                  <Button className="w-full" size="lg">
                    Sign Up as Vendor
                  </Button>
                </Link>
                <Link to="/vendor/login" className="block">
                  <Button variant="outline" className="w-full">
                    Already have an account?
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-elevated border-0 hover:shadow-button transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Manage products and group-buy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Add and manage products</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Monitor group progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Admin controls & settings</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/admin/login" className="block">
                  <Button variant="gradient" className="w-full" size="lg">
                    Admin Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
