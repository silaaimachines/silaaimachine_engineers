module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // Use Strapi's database connection to run a raw SQL query
    const knex = strapi.db.connection;

    try {
      // Query the maximum job number from the service_registrations table
      const result = await knex('service_registrations')
        .max('job_number as maxJobNumber')
        .first();

      // If there's no job number yet, start from 5000
      let newJobNumber = result.maxJobNumber ? parseInt(result.maxJobNumber, 10) + 1 : 5000;

      // Assign the new job number
      data.JobNumber = newJobNumber;

      // Check if CustomerNumber already exists in the customers table
      const customerRecord = await knex('customers')
        .select('customer_id', 'customer_name', 'contact_number')
        .where('contact_number', data.CustomerNumber)
        .first();

      let customerId;
      
      if (customerRecord) {
        // If the customer number exists, use the existing customer_id
        customerId = customerRecord.customer_id;
      } else {
        // If the customer number doesn't exist, generate a new customer ID
        const customerMaxId = await knex('customers')
          .max('customer_id as maxCustomerId')
          .first();

        // Get the numeric part of the customer ID and increment by 1
        let newCustomerId;
        if (customerMaxId.maxCustomerId) {
          const numericPart = parseInt(customerMaxId.maxCustomerId.slice(2), 10) + 1;
          newCustomerId = `CN${String(numericPart).padStart(5, '0')}`;
        } else {
          // If there are no customer IDs yet, start with CN00001
          newCustomerId = 'CN00001';
        }

        // Insert the new customer into the customers table
        await knex('customers').insert({
          customer_id: newCustomerId,
          customer_name: data.CustomerName,
          contact_number: data.CustomerNumber,
        });

        customerId = newCustomerId;
      }

      // Assign the customer ID to the data object
      data.CustomerID = customerId;

    } catch (error) {
      console.error('Error processing job number or customer ID:', error);
      throw new Error('Unable to process job number or customer ID');
    }
  },
};
