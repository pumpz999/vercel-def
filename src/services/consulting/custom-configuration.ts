export interface ConsultingService {
  id: string
  name: string
  description: string
  price: number
  duration: number // in hours
  deliverables: string[]
}

export class ConsultingServiceManager {
  private static consultingServices: ConsultingService[] = [
    {
      id: 'platform-setup',
      name: 'Platform Initial Setup Consultation',
      description: 'Comprehensive DeFi platform configuration and optimization',
      price: 2500,
      duration: 10,
      deliverables: [
        'Custom Platform Configuration',
        'Blockchain Network Setup',
        'Security Assessment',
        'Initial Performance Optimization'
      ]
    },
    {
      id: 'compliance-advisory',
      name: 'Regulatory Compliance Consultation',
      description: 'Comprehensive regulatory compliance and risk management strategy',
      price: 5000,
      duration: 20,
      deliverables: [
        'Regulatory Landscape Analysis',
        'KYC/AML Strategy Development',
        'Compliance Framework Design',
        'Risk Mitigation Recommendations'
      ]
    },
    {
      id: 'advanced-integration',
      name: 'Advanced Blockchain Integration',
      description: 'Custom blockchain network and smart contract integration',
      price: 7500,
      duration: 40,
      deliverables: [
        'Multi-Chain Integration Strategy',
        'Custom Smart Contract Development',
        'Cross-Chain Compatibility Assessment',
        'Performance Optimization'
      ]
    }
  ]

  // Get available consulting services
  static getConsultingServices(): ConsultingService[] {
    return this.consultingServices
  }

  // Book consulting service
  static bookConsultingService(
    serviceId: string, 
    clientDetails: {
      name: string
      email: string
      organization: string
    }
  ): boolean {
    const service = this.consultingServices.find(s => s.id === serviceId)
    
    if (!service) {
      throw new Error('Invalid consulting service')
    }

    try {
      // Simulate service booking
      // In a real-world scenario, this would integrate with a 
      // booking and payment system
      return true
    } catch (error) {
      console.error('Consulting service booking failed', error)
      return false
    }
  }
}
