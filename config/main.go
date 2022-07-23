package config

import (
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/hashicorp/hcl/v2/hclsyntax"
	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Filer interface {
	File() *hclwrite.File
}

type Filenamer interface {
	Filename() string
}

type Referencer interface {
	Block() *hclwrite.Block
}

type WriterToFiler interface {
	Filer
	Filenamer
}

type ListParser interface {
	ListParse() []cty.Value
}

type ObjectParser interface {
	ObjectParse() map[string]cty.Value
}

type BodyParser interface {
	BodyParse(*hclwrite.Body) *hclwrite.Body
}

// FormatResourceName will transform a string to replace - with _.
func FormatResourceName(s string) string {
	return strings.ReplaceAll(s, "-", "_")
}

// ListStringParse will transform a slice of strings into a slice of cty.Value
func ListStringParse(s []string) []cty.Value {
	l := make([]cty.Value, len(s))
	for i, v := range s {
		l[i] = cty.StringVal(v)
	}
	return l
}

// ListParse will take a ListParser interface and transform it into a slice of cty.Value
func ListParse(l ListParser) []cty.Value {
	return l.ListParse()
}

// BodyParse will take a BodyParser interface and a pointer to hclwrite.Body and modify the hclwrite.Body
func BodyParse(o BodyParser, b *hclwrite.Body) *hclwrite.Body {
	return o.BodyParse(b)
}

// ObjectParse takes an ObjectParser interface and outputs a map of string keys and cty.Value values
func ObjectParse(o ObjectParser) map[string]cty.Value {
	return o.ObjectParse()
}

// WritetoFile takes a WriterToFiler interface and a string path and creates a file at the path location
func WritetoFile(w WriterToFiler, p string) error {
	tf := w.File()
	f, err := os.Create(path.Join(p, w.Filename()))
	if err != nil {
		return err
	}
	defer f.Close()
	if _, err := tf.WriteTo(f); err != nil {
		return err
	}
	return nil
}

// Reference take a Referencer interface and a string and outputs hclwrite.Tokens that point to a terraform resource to reference
func Reference(r Referencer, s string) hclwrite.Tokens {
	ref := fmt.Sprintf("%s.%s", strings.Join(r.Block().Labels(), "."), s)
	return hclwrite.Tokens{
		{Type: hclsyntax.TokenIdent, Bytes: []byte(ref)},
	}
}
