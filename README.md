# save-to-roblox

A GitHub Action that saves a place file to Roblox using the Roblox Open Cloud API.

## Usage

```yaml
- name: Save to Roblox
  uses: tenx29/save-to-roblox@v1
  with:
    api-key: ${{ secrets.ROBLOX_API_KEY }}
    universe-id: 123456789
    place-id: 987654321
    place-file: place.rbxlx
    version-type: Saved     # Optional, defaults to Saved. Can be either Saved or Published.
```

## Inputs

`api-key` - The API key to use for authentication. This should be stored as a secret in your repository.

`universe-id` - The ID of the universe to save the place to.

`place-id` - The ID of the place to save the place to.

`place-file` - The path to the place file to save.

`version-type` - The version type to save the place as. Can be either Saved or Published. Defaults to Saved.

More information related to place ID, universe ID and version type can be found in the [Place Publishing API documentation](https://create.roblox.com/docs/reference/cloud/universes-api/v1).
