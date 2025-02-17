import axios from 'axios'

interface AdminConfiguration {
  networkConfigs: any[]
  featureFlags: any
  securitySettings: any
  contractAddresses: any
}

export class AdminConfigurationService {
  private static instance: AdminConfigurationService
  private baseUrl = '/api/admin/configuration'

  // Singleton pattern
  public static getInstance(): AdminConfigurationService {
    if (!AdminConfigurationService.instance) {
      AdminConfigurationService.instance = new AdminConfigurationService()
    }
    return AdminConfigurationService.instance
  }

  // Fetch current configuration
  async getConfiguration(): Promise<AdminConfiguration> {
    try {
      const response = await axios.get(this.baseUrl)
      return response.data
    } catch (error) {
      console.error('Failed to fetch configuration', error)
      throw error
    }
  }

  // Update configuration
  async updateConfiguration(config: Partial<AdminConfiguration>): Promise<void> {
    try {
      await axios.patch(this.baseUrl, config)
    } catch (error) {
      console.error('Failed to update configuration', error)
      throw error
    }
  }

  // Validate admin access
  async validateAdminAccess(signature: string): Promise<boolean> {
    try {
      const response = await axios.post('/api/admin/validate', { signature })
      return response.data.isValid
    } catch (error) {
      console.error('Admin validation failed', error)
      return false
    }
  }

  // Audit log of configuration changes
  async getConfigurationAuditLog() {
    try {
      const response = await axios.get('/api/admin/audit-log')
      return response.data
    } catch (error) {
      console.error('Failed to fetch audit log', error)
      throw error
    }
  }
}
