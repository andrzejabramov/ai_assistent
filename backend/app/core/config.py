from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    admin_login: str = "admin"
    admin_password: str = "3333"
    usd_to_rub_rate: float = 80.0
    mcp_url: str = ""
    mcp_token: str = ""
    todoist_api_token: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
