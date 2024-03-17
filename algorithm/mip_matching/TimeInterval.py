from __future__ import annotations
from dataclasses import dataclass


@dataclass(frozen=True)
class TimeInterval:
    """
    Definerer et tidsintervall fra og med start til og uten end.
    """
    start: int
    end: int

    def overlaps(self, other: TimeInterval) -> bool:
        """Returnerer true om to timeslots er helt eller delvis overlappende."""
        return other.start <= self.start < other.end or self.start <= other.start < self.end

    def contains(self, other: TimeInterval) -> bool:
        """Returnerer true om other inngår helt i self."""
        return self.start <= other.start and other.end <= self.end

    def intersection(self, other: TimeInterval) -> TimeInterval:
        """Returnerer et snitt av to timeslots."""
        if not self.overlaps(other):
            # Snittet er tomt grunnet ingen overlapp
            return None

        start = max(self.start, other.start)
        end = min(self.end, other.end)
        return TimeInterval(start, end)

    def get_contained_slots(self, slots: list[TimeInterval]):
        """Returnerer en delmengde av de slots i listen av timeslots
          "slots", som inngår helt i dette timeslottet."""
        return set(slot for slot in slots if self.contains(slot))

    def divide(self, length: int) -> list[TimeInterval]:
        return TimeInterval.divide_interval(self, length)

    @staticmethod
    def divide_interval(interval: TimeInterval, length: int) -> list[TimeInterval]:
        """

        Deler opp et intervall i mindre intervaller av lengde *length*.

        Note:
        - Det antas at intervallet kan deles opp i hele deler av lengde *length*.
        Overskytende tid vil bli ignorert.
        """
        result = []
        global_start = interval.start
        local_start = global_start
        local_end = local_start + length

        while local_end <= interval.end:
            result.append(TimeInterval(local_start, local_end))
            local_start = local_end
            local_end += length

        return result


"""
Dette er gammel kode som nå er flyttet til de passende komité-/søker-klassene.
Foreløpig beholdt for referanse.
"""
# class TimeIntervals:
#     def __init__(self, initial_list: list[TimeInterval] = None):
#         self.list: list[TimeInterval] = initial_list if initial_list else []

#     def add(self, interval: TimeInterval):
#         self.list.append(interval)

#     def recursive_intersection(self, other: TimeIntervals):
#         """
#         Returnerer alle tidsintervallene i *other* som er inneholdt i et av *self* sine intervaller"""
#         result = TimeIntervals()

#         for self_interval, other_interval in itertools.product(self.list, other.list):
#             if self_interval.contains(other_interval):
#                 result.add(other_interval)

#         return result

#     def __iter__(self):
#         return self.list.__iter__()