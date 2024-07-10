# Laravel JWT

Notes:  
JWT Biasanya ada 2 token, access token sama refresh token.  
Access token biasanya ada nyimpen data user, sementara refresh token cuman id user aja.  
Refresh token biasanya lifetimenya 2 kali dari access token.

### Install Composer Dependency

```bash
composer require firebase/php-jwt
```

### Config file

```php
# config/auth.php

'token_key_type' => env('AUTH_TOKEN_KEY_TYPE', 'HS256'),
'access_token_key' => env('AUTH_ACCESS_TOKEN_KEY', 'access.unimed.ac.id'),
'refresh_token_key' => env('AUTH_REFRESH_TOKEN_KEY', 'access.unimed.ac.id'),
```

### Helper Builder

```php
<?php
# app/Helper/JWTBuilder.php

use Carbon\CarbonInterface;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Support\Carbon;

class JWTBuilder
{
    private string $tokenKey;
    private string $keyType;
    private array $payload;

    private function __construct()
    {
    }

    private function getDefaultAccessTokenKey(): string
    {
        return config('auth.access_token_key');
    }

    private function getDefaultRefreshTokenKey(): string
    {
        return config('auth.refresh_token_key');
    }

    private function getDefaultKeyType(): string
    {
        return config('auth.token_key_type');
    }

    public function getDefaultExpireSeconds(): int
    {
        return CarbonInterface::SECONDS_PER_MINUTE * 15;
    }

    public static function builder(): JWTBuilder
    {
        return new JWTBuilder();
    }

    public function useDefaultAccessTokenKey(): JWTBuilder
    {
        $this->setTokenKey($this->getDefaultAccessTokenKey());
        return $this;
    }

    public function useDefaultRefreshTokenKey(): JWTBuilder
    {
        $this->setTokenKey($this->getDefaultRefreshTokenKey());
        return $this;
    }

    public function useDefaultKeyType(): JWTBuilder
    {
        $this->setKeyType($this->getDefaultKeyType());
        return $this;
    }

    public function setTokenKey(string $tokenKey): JWTBuilder
    {
        $this->tokenKey = $tokenKey;
        return $this;
    }

    public function setKeyType(string $keyType): JWTBuilder
    {
        $this->keyType = $keyType;
        return $this;
    }

    public function setPayload(array $payload): JWTBuilder
    {
        $this->payload = $payload;
        return $this;
    }

    /**
     * @throws Exception
     */
    public function build(): array
    {
        if (empty($this->payload)) {
            throw new Exception("Payload must be set");
        }

        if (empty($this->tokenKey)) {
            throw new Exception("Token key must be set");
        }

        if (empty($this->keyType)) {
            throw new Exception("Token key type must be set");
        }

        $issuedAt = Carbon::now()->timestamp;
        $expiredSeconds = $this->getDefaultExpireSeconds();
        $token = JWT::encode(array_merge([
            'iss' => 'https://unimed.ac.id',
            'aud' => 'https://unimed.ac.id',
            'iat' => $issuedAt,
            'exp' => $issuedAt + $expiredSeconds,
        ], $this->payload), $this->tokenKey, $this->keyType);

        return [
            'token' => $token,
            'token_type' => 'Bearer',
            'token_expire_seconds' => $expiredSeconds,
        ];
    }
}
```