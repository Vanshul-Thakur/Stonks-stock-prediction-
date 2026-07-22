def get_logo_url(website: str | None):
    if not website:
        return None

    website = (
        website.replace("https://", "")
               .replace("http://", "")
               .replace("www.", "")
               .rstrip("/")
    )

    return f"https://www.google.com/s2/favicons?domain={website}&sz=128"