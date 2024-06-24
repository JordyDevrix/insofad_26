export interface ReturnRequest {
    id?: number;
    orderId: string;
    reason: string;
    preferredHandling: string;
    status?: string;
    customerId: string;
  }