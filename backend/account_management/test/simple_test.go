package test

import (
	"strconv"
	"testing"
)

func TestMockup(t *testing.T) {
	expected := 2
	result := 1 + 1
	if result != expected {
		t.Errorf("Result was incorrect, got: %s, want: %s.", strconv.Itoa(result), strconv.Itoa(expected))
	}
}
