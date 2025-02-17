const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetchPreviousSales(brandQuery) {
  try {
    console.log('Testing fetch for brand:', brandQuery);

    const { data, error } = await supabase
      .from('previous_sales')
      .select('brand, event, sitewide, discount, start_date, end_date')
      .ilike('brand', `%${brandQuery}%`)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    console.log('Fetched data:', data);

    const transformedData = data?.map(sale => ({
      brand: sale.brand,
      event: sale.event,
      sitewide: sale.sitewide === 1, // Convert to boolean
      discount: sale.discount,
      start_date: sale.start_date,
      end_date: sale.end_date
    })) || [];

    console.log('Transformed data:', transformedData);

    if (transformedData.length === 0) {
      console.log('No sales data found for brand:', brandQuery);
    } else {
      console.log('Sales data found for brand:', brandQuery);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Test with a specific brand
testFetchPreviousSales('gymshark');