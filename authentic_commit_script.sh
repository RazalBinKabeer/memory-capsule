#!/bin/bash

# Set the start date
start_date="2024-04-14"
end_date=$(date +%Y-%m-%d)

current_date="$start_date"

while [[ "$current_date" < "$end_date" ]]; do
  for i in {1..3}; do
    # Make an authentic change
    echo "Update on $current_date #$i" >> changes.txt
    git add .
    GIT_COMMITTER_DATE="$current_date 12:00:00" git commit -m "Update on $current_date #$i" --date="$current_date 12:00:00"
  done
  # Move to the next day
  current_date=$(date -I -d "$current_date + 1 day")
done
