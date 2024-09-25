// db.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgresql://andres:<ENTER-SQL-USER-QvJMcPP18wL_BNJR3P6GMw>@ejemplo-1923.jxf.gcp-us-west2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
});

export default pool;
