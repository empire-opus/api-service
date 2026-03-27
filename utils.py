# utils.py
from typing import List, Dict
from datetime import datetime

def is_valid_date(date_str: str) -> bool:
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_input(data: Dict, required_keys: List[str]) -> bool:
    for key in required_keys:
        if key not in data:
            return False
        if isinstance(data[key], str) and len(data[key]) == 0:
            return False
    return True

def get_current_datetime() -> str:
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')