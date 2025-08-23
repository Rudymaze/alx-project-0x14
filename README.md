## API Overview

The MoviesDatabase API provides comprehensive movie and TV show data with the following key features:

- **Content Discovery**: Browse movies and TV shows with filtering options by genre, year, language, and more
- **Detailed Information**: Access rich metadata including titles, release dates, ratings, cast/crew, plot summaries, and technical specs
- **Search Functionality**: Robust search capabilities with support for queries by title, keyword, or person
- **Multi-Language Support**: Content available in multiple languages with translation options
- **Image Resources**: Access to posters, backdrops, and stills in various resolutions
- **Up-to-date Content**: Regularly updated database including current releases and upcoming titles
- **Developer-Friendly**: RESTful JSON API with clear documentation and straightforward authentication

The API offers both free tier access with basic features and premium tiers with expanded capabilities.

## Version

The current version of the MoviesDatabase API is **v1**.

## Available Endpoints

### Titles

#### Get Multiple Titles

- **Path**: `/titles`
- **Description**: Returns an array of titles based on filters/sorting parameters
- **Query Parameters**:
  - `list`: Sets the collection to query (options available in Utils - Titles Lists)
  - Other filter/sorting parameters available
- **Response Model**: `title`

#### Get Titles by List of IDs

- **Path**: `/x/titles-by-ids`
- **Description**: Returns an array of titles matching provided IDs
- **Query Parameters**:
  - `info`: Additional information to include
  - `list`: Collection to query (options in Utils - Titles Lists)
  - `idsList`: Required array of title IDs (strings)
- **Response Model**: `title`

#### Get Single Title

- **Path**: `/titles/{id}`
- **Description**: Returns detailed information about a specific title
- **Path Parameter**:
  - `id`: Required IMDb ID of the title
- **Query Parameters**:
  - `info`: Additional information to include
- **Response Model**: `title`

### Title Ratings

- **Path**: `/titles/{id}/ratings`
- **Description**: Returns rating and vote count for a title
- **Path Parameter**:
  - `id`: Required IMDb ID of the title
- **Response Model**: `rating`

### Series Information

#### Get Series Episodes (Light)

- **Path**: `/titles/series/{id}`
- **Description**: Returns basic episode information (ID, episode/season numbers) in ascending order
- **Path Parameter**:
  - `id`: Required IMDb ID of the series
- **Response Model**: `light episode`

#### Get Season Count

- **Path**: `/titles/seasons/{id}`
- **Description**: Returns total number of seasons for a series (integer)
- **Path Parameter**:
  - `id`: Required IMDb ID of the series

#### Get Episode IDs by Season

- **Path**: `/titles/series/{id}/{season}`
- **Description**: Returns episode IDs for a specific season
- **Path Parameters**:
  - `id`: Required IMDb ID of the series
  - `season`: Required season number
- **Response Model**: `light episode`

#### Get Episode Details

- **Path**: `/titles/episode/{id}`
- **Description**: Returns full episode details
- **Path Parameter**:
  - `id`: Required IMDb ID of the episode
- **Query Parameters**:
  - `info`: Additional information to include
- **Response Model**: `title`

### Upcoming Titles

- **Path**: `/titles/x/upcoming`
- **Description**: Returns array of upcoming titles with filters/sorting
- **Query Parameters**: Multiple available
- **Response Model**: `title`

### Search

#### Search Titles by Keyword

- **Path**: `/titles/search/keyword/{keyword}`
- **Description**: Returns titles matching keyword and optional filters
- **Path Parameter**:
  - `keyword`: Required search term
- **Query Parameters**: Multiple filter/sorting options
- **Response Model**: `title`

#### Search Titles by Title

- **Path**: `/titles/search/title/{title}`
- **Description**: Returns titles matching title/partial title
- **Path Parameter**:
  - `title`: Title or partial title to match
- **Query Parameters**:
  - `exact`: Boolean for exact matching (default: false)
  - Other filter/sorting options
- **Response Model**: `title`

#### Search Titles by AKAs

- **Path**: `/titles/search/akas/{aka}`
- **Description**: Returns titles matching exact AKA (case sensitive)
- **Path Parameter**:
  - `aka`: Exact alternate title to match
- **Query Parameters**: Multiple filter/sorting options
- **Response Model**: `title`

### Actors

#### Get Multiple Actors

- **Path**: `/actors`
- **Description**: Returns array of actors with pagination
- **Query Parameters**:
  - `limit`: Number of results per page
  - `page`: Page number
- **Response Model**: `actor`

#### Get Actor by ID

- **Path**: `/actors/{id}`
- **Description**: Returns detailed actor information
- **Path Parameter**:
  - `id`: Required IMDb ID of actor
- **Response Model**: `actor`

### Utils

#### Get Title Types

- **Path**: `/title/utils/titleType`
- **Description**: Returns array of available title types
- **Response**: Array of strings

#### Get Genres

- **Path**: `/title/utils/genres`
- **Description**: Returns array of available genres
- **Response**: Array of strings

#### Get Title Lists

- **Path**: `/title/utils/lists`
- **Description**: Returns array of available lists (for 'list' query parameter)
- **Response**: Array of strings

## Request and Response Format

### Typical Request Structure

Requests follow REST conventions with JSON responses. Most endpoints support these common parameters:

```http
GET /titles/{id}?info=base_info,extended_info&list=top_rated
Headers:
  Authorization: Bearer {api_key}
  Accept: application/json


```

### Typical Response Structure

### Successful responses (200 OK) contain:

- **data**: Main payload (object or array)

- **status**: "success" or "error"

- **status_message**: Optional description

**Example**: Search Titles

- **Request**:
  GET /titles/search/title/shawshank?exact=false

- **Response**:
  {
  "status": "success",
  "data": [
  {
  "id": "tt0111161",
  "title": "The Shawshank Redemption",
  "type": "movie",
  "year": 1994
  },
  {
  "id": "tt1234567",
  "title": "Shawshank: The Documentary",
  "type": "movie",
  "year": 2021
  }
  ]
  }

  ## Authentication

### API Key Requirement

All requests to the MoviesDatabase API require authentication using an API key. You can obtain your key by registering at [[MoviesDatabase Developer Portal](https://rapidapi.com/SAdrian/api/moviesdatabase)].

### Usage

Include your API key in the `Authorization` header of every request:

```http
GET /titles/tt0111161
Headers:
  Authorization: Bearer your_api_key_here
  Accept: application/json
```

### Error Handling

### Common Error Responses

### The API uses standard HTTP status codes with JSON error payloads. All errors include:

{

- **"status"**: "error",
- **"status_code"**: 4XX/5XX,
- **"status_message"**: "Human-readable description",
- **"documentation_url**": "https://docs.moviesdatabase.com/errors/{error_code}"
  }

Client Errors (4XX)
Code Error, Cause, Solution
400 Bad Request , Invalid query parameters, Verify parameter types/values
401 Unauthorized, Missing/invalid API key, Check Authorization header
403 Forbidden, Insufficient permissions, Upgrade subscription plan
404 Not Found, Invalid endpoint or resource ID, Validate URL/ID exists
429 Too Many Requests, Rate limit exceeded, Implement exponential backoff

### Handling Errors in Code

### JavaScript Example (Fetch API)

async function fetchTitle(id) {
try {
const response = await fetch(`https://api.moviesdatabase.com/titles/${id}`, {
headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});

    if (!response.ok) {
      const error = await response.json();
      // Specific handling
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 5;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return fetchTitle(id); // Retry
      }
      throw new Error(`${error.status_code}: ${error.status_message}`);
    }

    return await response.json();

} catch (error) {
console.error('API request failed:', error);
// Fallback logic here (e.g., cached data)
}
}

### Usage Limits and Best Practices

### Rate Limits

### The API enforces tier-based rate limits:

Tier Requests/Minute, Requests/Day, Burst Capacity
Free 10, 1,000, 20
Pro 60, 50,000, 100
Enterprise Custom, Custom, Custom

### Efficient Request Handling

### Batching: Use /x/titles-by-ids instead of multiple /titles/{id} calls

GET /x/titles-by-ids?idsList=["tt0111161","tt0468569"]

### Field Filtering: Request only needed data with info parameter

GET /titles/tt0111161?info=base_info,cast

### Caching Strategies

- **_JavaScript_**:

// Example: Cache responses for 5 minutes
const CACHE_TTL = 300_000;

async function getTitleWithCache(id) {
const cacheKey = `title_${id}`;
const cached = localStorage.getItem(cacheKey);

if (cached && Date.now() - JSON.parse(cached).timestamp < CACHE_TTL) {
return JSON.parse(cached).data;
}

const freshData = await fetchTitle(id); // From API
localStorage.setItem(cacheKey, JSON.stringify({
data: freshData,
timestamp: Date.now()
}));
return freshData;
}
#   a l x - p w a - 0 x 0 1  
 