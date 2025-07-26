import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Package, Users, Clock, CheckCircle, Truck } from "lucide-react";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Premium Rice 25kg",
    price: 450,
    currentOrders: 3,
    maxOrders: 5,
    deadline: "2 days left",
    status: "active"
  },
  {
    id: 2,
    name: "Organic Wheat Flour 20kg",
    price: 320,
    currentOrders: 5,
    maxOrders: 5,
    deadline: "Group completed",
    status: "completed"
  },
  {
    id: 3,
    name: "Sugar 50kg",
    price: 280,
    currentOrders: 2,
    maxOrders: 4,
    deadline: "5 days left",
    status: "active"
  }
];

const mockMyOrders = [
  { id: 1, product: "Premium Rice 25kg", quantity: 2, status: "waiting" },
  { id: 2, product: "Organic Wheat Flour 20kg", quantity: 1, status: "confirmed" },
  { id: 3, product: "Cooking Oil 15L", quantity: 3, status: "delivered" }
];

const VendorDashboard = () => {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleJoinOrder = (product) => {
    setSelectedProduct(product);
    setJoinModalOpen(true);
  };

  const handleSubmitOrder = () => {
    toast({
      title: "Order Joined!",
      description: `Successfully joined ${selectedProduct?.name} with quantity ${quantity}`,
      variant: "default"
    });
    setJoinModalOpen(false);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "waiting": return "pending";
      case "confirmed": return "success";
      case "delivered": return "success";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "waiting": return <Clock className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "delivered": return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your group-buy orders and track progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Available Group-Buy Products */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              Available Group-Buy Products
            </h2>
            
            {mockProducts.map((product) => (
              <Card key={product.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-xl font-semibold text-primary">
                        ₹{product.price}
                      </CardDescription>
                    </div>
                    <Badge variant={product.status === "completed" ? "success" : "pending"}>
                      {product.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Group Progress</span>
                      <span>{product.currentOrders}/{product.maxOrders} joined</span>
                    </div>
                    <Progress 
                      value={(product.currentOrders / product.maxOrders) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {product.deadline}
                    </span>
                    <Button
                      onClick={() => handleJoinOrder(product)}
                      disabled={product.status === "completed"}
                      variant={product.status === "completed" ? "secondary" : "default"}
                    >
                      {product.status === "completed" ? "Completed" : "Join Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Orders */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              My Orders
            </h2>
            
            {mockMyOrders.map((order) => (
              <Card key={order.id} className="bg-gradient-card shadow-card">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{order.product}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Order Modal */}
        <Dialog open={joinModalOpen} onOpenChange={setJoinModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Group Order</DialogTitle>
              <DialogDescription>
                Enter the quantity you want to order for {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Price per unit: ₹{selectedProduct?.price}
                <br />
                Total: ₹{(selectedProduct?.price || 0) * quantity}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmitOrder} className="flex-1">
                  Join Order
                </Button>
                <Button variant="outline" onClick={() => setJoinModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VendorDashboard;